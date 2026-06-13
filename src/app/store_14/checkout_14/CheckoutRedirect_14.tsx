'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import LoadingContainer from '../_components/global/LoadingContainer';

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
          body: JSON.stringify({ orderId, cartId }),
        });

        if (!response.ok) {
          throw new Error('Unable to start checkout');
        }

        const data = (await response.json()) as { url?: string };
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
