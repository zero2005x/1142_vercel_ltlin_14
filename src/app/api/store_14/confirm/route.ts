import { redirect } from 'next/navigation';
import { type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

type StripeRetrieveSessionResponse = {
  status?: string;
  payment_status?: string;
  metadata?: {
    orderId?: string;
    cartId?: string;
  };
  error?: {
    message?: string;
  };
};

export const GET = async (req: NextRequest) => {
  if (!prisma) {
    return Response.json({ message: 'Database is not configured' }, { status: 500 });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    return Response.json(
      { message: 'STRIPE_SECRET_KEY is not configured' },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return Response.json({ message: 'Missing Stripe session id' }, { status: 400 });
  }

  const stripeResponse = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
    {
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
      },
    }
  );
  const session = (await stripeResponse.json()) as StripeRetrieveSessionResponse;

  if (!stripeResponse.ok) {
    return Response.json(
      { message: session.error?.message ?? 'Unable to verify Stripe session' },
      { status: 500 }
    );
  }

  const orderId = session.metadata?.orderId;
  const cartId = session.metadata?.cartId;

  if (orderId && cartId && session.payment_status === 'paid') {
    await prisma.order.update({
      where: { id: orderId },
      data: { isPaid: true },
    });
    await prisma.cart.deleteMany({
      where: { id: cartId },
    });
  }

  redirect('/store_14/orders_14');
};
