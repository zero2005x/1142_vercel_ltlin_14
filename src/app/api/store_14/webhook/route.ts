import { createHmac, timingSafeEqual } from 'crypto';
import { type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

type StripeCheckoutSession = {
  id?: string;
  object?: string;
  status?: string;
  payment_status?: string;
  metadata?: {
    orderId?: string;
    cartId?: string;
    userId?: string;
  };
};

type StripeWebhookEvent = {
  id?: string;
  type?: string;
  data?: {
    object?: StripeCheckoutSession;
  };
};

const SIGNATURE_TOLERANCE_SECONDS = 300;

const getSignatureValues = (signatureHeader: string) => {
  return signatureHeader.split(',').reduce(
    (values, part) => {
      const [key, value] = part.split('=');

      if (key === 't' && value) {
        values.timestamp = value;
      }

      if (key === 'v1' && value) {
        values.signatures.push(value);
      }

      return values;
    },
    { timestamp: '', signatures: [] as string[] }
  );
};

const isHexSignature = (signature: string) => /^[0-9a-f]+$/i.test(signature);

const verifyStripeSignature = ({
  payload,
  signatureHeader,
  webhookSecret,
}: {
  payload: string;
  signatureHeader: string;
  webhookSecret: string;
}) => {
  const { timestamp, signatures } = getSignatureValues(signatureHeader);
  const timestampNumber = Number(timestamp);

  if (!timestamp || !Number.isFinite(timestampNumber) || signatures.length === 0) {
    return false;
  }

  const ageInSeconds = Math.abs(Date.now() / 1000 - timestampNumber);
  if (ageInSeconds > SIGNATURE_TOLERANCE_SECONDS) {
    return false;
  }

  const signedPayload = `${timestamp}.${payload}`;
  const expectedSignature = createHmac('sha256', webhookSecret)
    .update(signedPayload, 'utf8')
    .digest('hex');
  const expectedBuffer = Buffer.from(expectedSignature, 'hex');

  return signatures.some((signature) => {
    if (!isHexSignature(signature)) {
      return false;
    }

    const signatureBuffer = Buffer.from(signature, 'hex');

    return (
      signatureBuffer.length === expectedBuffer.length &&
      timingSafeEqual(signatureBuffer, expectedBuffer)
    );
  });
};

const completePaidCheckoutSession = async (session: StripeCheckoutSession) => {
  if (!prisma) {
    throw new Error('Database is not configured');
  }

  const orderId = session.metadata?.orderId;
  const cartId = session.metadata?.cartId;
  const userId = session.metadata?.userId;

  if (!orderId || !cartId || !userId) {
    console.warn('store_14 webhook ignored session without metadata:', session.id);
    return { ignored: 'Missing checkout metadata' };
  }

  if (session.payment_status !== 'paid') {
    return { ignored: `Checkout payment status is ${session.payment_status ?? 'unknown'}` };
  }

  await prisma.$transaction([
    prisma.order.updateMany({
      where: { id: orderId, clerkId: userId },
      data: { isPaid: true },
    }),
    prisma.cart.deleteMany({
      where: { id: cartId, clerkId: userId },
    }),
  ]);

  return { orderId };
};

export const POST = async (req: NextRequest) => {
  if (!prisma) {
    return Response.json({ message: 'Database is not configured' }, { status: 500 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return Response.json(
      { message: 'STRIPE_WEBHOOK_SECRET is not configured' },
      { status: 500 }
    );
  }

  const signatureHeader = req.headers.get('stripe-signature');
  if (!signatureHeader) {
    return Response.json({ message: 'Missing Stripe signature' }, { status: 400 });
  }

  const payload = await req.text();

  if (!verifyStripeSignature({ payload, signatureHeader, webhookSecret })) {
    return Response.json({ message: 'Invalid Stripe signature' }, { status: 400 });
  }

  let event: StripeWebhookEvent;
  try {
    event = JSON.parse(payload) as StripeWebhookEvent;
  } catch {
    return Response.json({ message: 'Invalid Stripe payload' }, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const result = await completePaidCheckoutSession(event.data?.object ?? {});
      return Response.json({ received: true, ...result });
    }

    return Response.json({ received: true, ignored: event.type ?? 'Unknown event type' });
  } catch (error) {
    console.error('store_14 webhook failed:', error);

    return Response.json(
      {
        message:
          error instanceof Error ? error.message : 'Unable to process Stripe webhook',
      },
      { status: 500 }
    );
  }
};
