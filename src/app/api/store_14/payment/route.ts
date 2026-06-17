import { auth } from '@clerk/nextjs/server';
import { type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

type StripeSessionResponse = {
  url?: string;
  error?: {
    message?: string;
  };
};

const normalizeOrigin = (origin: string) => origin.replace(/\/$/, '');

const getAppOrigin = (req: NextRequest) => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return normalizeOrigin(process.env.NEXT_PUBLIC_APP_URL);
  }

  if (process.env.VERCEL_URL) {
    return `https://${normalizeOrigin(process.env.VERCEL_URL)}`;
  }

  return req.nextUrl.origin;
};

export const POST = async (req: NextRequest) => {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }

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

  const appOrigin = getAppOrigin(req);
  const requestOrigin = req.headers.get('origin');

  if (requestOrigin && normalizeOrigin(requestOrigin) !== appOrigin) {
    return Response.json({ message: 'Invalid request origin' }, { status: 403 });
  }

  const { orderId, cartId } = (await req.json()) as {
    orderId?: string;
    cartId?: string;
  };

  if (!orderId || !cartId) {
    return Response.json({ message: 'Missing checkout data' }, { status: 400 });
  }

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      clerkId: userId,
      isPaid: false,
    },
  });
  const cart = await prisma.cart.findFirst({
    where: {
      id: cartId,
      clerkId: userId,
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order || !cart || cart.cartItems.length === 0) {
    return Response.json({ message: 'Order or cart not found' }, { status: 404 });
  }

  const stripeParams = new URLSearchParams();
  stripeParams.set('mode', 'payment');
  stripeParams.set('success_url', `${appOrigin}/api/store_14/confirm?session_id={CHECKOUT_SESSION_ID}`);
  stripeParams.set('cancel_url', `${appOrigin}/store_14/cart_14`);
  stripeParams.set('metadata[orderId]', order.id);
  stripeParams.set('metadata[cartId]', cart.id);
  stripeParams.set('metadata[userId]', userId);

  cart.cartItems.forEach((cartItem, index) => {
    const product = cartItem.product;
    stripeParams.set(`line_items[${index}][quantity]`, cartItem.amount.toString());
    stripeParams.set(`line_items[${index}][price_data][currency]`, 'usd');
    stripeParams.set(
      `line_items[${index}][price_data][unit_amount]`,
      Math.max(50, Math.round(product.price * 100)).toString()
    );
    stripeParams.set(
      `line_items[${index}][price_data][product_data][name]`,
      product.name
    );

    if (product.image.startsWith('http')) {
      stripeParams.set(
        `line_items[${index}][price_data][product_data][images][0]`,
        product.image
      );
    }
  });

  const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${stripeSecretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: stripeParams,
  });

  const stripeSession = (await stripeResponse.json()) as StripeSessionResponse;

  if (!stripeResponse.ok || !stripeSession.url) {
    return Response.json(
      {
        message:
          stripeSession.error?.message ?? 'Unable to create Stripe checkout session',
      },
      { status: 500 }
    );
  }

  return Response.json({ url: stripeSession.url });
};
