'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import LoadingContainer from '../_components/global/LoadingContainer';

type CheckoutResponse = {
  url?: string;
  message?: string;
};

async function getCheckoutErrorMessage(response: Response) {
  const fallback = `Unable to start checkout (${response.status})`;
  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    const data = (await response.json()) as CheckoutResponse;
    return data.message ?? fallback;
  }

  const text = await response.text();
  return text || fallback;
}

function CheckoutRedirect_14({
  orderId,
  cartId,
}: {
  orderId: string;
  cartId: string;
}) {
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function createCheckoutSession() {
      try {
        const response = await fetch('/api/store_14/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
          credentials: 'same-origin',
          body: JSON.stringify({ orderId, cartId }),
        });

        if (!response.ok) {
          throw new Error(await getCheckoutErrorMessage(response));
        }

        const data = (await response.json()) as CheckoutResponse;
        if (!data.url) throw new Error('Stripe did not return a checkout URL');
        window.location.assign(data.url);
      } catch (checkoutError) {
        if (!isMounted) return;
        setError(
          checkoutError instanceof Error
            ? checkoutError.message
            : 'Unable to start checkout'
        );
      }
    }

    createCheckoutSession();

    return () => {
      isMounted = false;
    };
  }, [cartId, orderId]);

  if (error) {
    return (
      <section className='space-y-4'>
        <h1 className='text-2xl font-semibold capitalize'>checkout</h1>
        <p className='text-muted-foreground'>{error}</p>
        <Button asChild>
          <Link href='/store_14/cart_14'>Back to cart</Link>
        </Button>
      </section>
    );
  }

  return <LoadingContainer />;
}

export default CheckoutRedirect_14;
