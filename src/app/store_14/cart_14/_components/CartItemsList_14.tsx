'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { formatCurrency } from '../../_utils/format';
import {
  removeCartItemAction,
  updateCartItemAction,
} from '../../_utils/action';

type CartItemWithProduct = {
  id: string;
  amount: number;
  product: {
    id: string;
    name: string;
    company: string;
    image: string;
    price: number;
  };
};

function CartItemsList_14({ cartItems }: { cartItems: CartItemWithProduct[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleAmountChange = (cartItemId: string, amount: number) => {
    startTransition(async () => {
      const result = await updateCartItemAction({ amount, cartItemId });
      if (result.message) toast(result.message);
      router.refresh();
    });
  };

  const handleRemove = (cartItemId: string) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append('id', cartItemId);
      const result = await removeCartItemAction({ message: '' }, formData);
      if (result?.message) toast(result.message);
      router.refresh();
    });
  };

  return (
    <div className='space-y-4'>
      {cartItems.map((item) => {
        const { id, amount, product } = item;
        return (
          <article
            key={id}
            className='flex flex-col gap-4 rounded-md border p-4 sm:flex-row'
          >
            <div className='relative h-24 w-24 shrink-0 overflow-hidden rounded-md'>
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes='96px'
                className='object-cover'
              />
            </div>

            <div className='flex flex-1 flex-col justify-between gap-2'>
              <div className='flex items-start justify-between gap-2'>
                <div>
                  <Link
                    href={`/store_14/products_14/${product.id}`}
                    className='font-semibold capitalize hover:underline'
                  >
                    {product.name}
                  </Link>
                  <p className='text-sm text-muted-foreground'>
                    {product.company}
                  </p>
                </div>
                <p className='font-medium'>{formatCurrency(product.price)}</p>
              </div>

              <div className='flex items-center justify-between gap-2'>
                <div className='flex items-center gap-x-2'>
                  <label htmlFor={`amount-${id}`} className='text-sm capitalize'>
                    amount
                  </label>
                  <select
                    id={`amount-${id}`}
                    value={amount}
                    disabled={isPending}
                    onChange={(e) =>
                      handleAmountChange(id, Number(e.target.value))
                    }
                    className='rounded-md border bg-background p-1'
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type='button'
                  disabled={isPending}
                  onClick={() => handleRemove(id)}
                  className='text-sm capitalize text-destructive hover:underline disabled:opacity-50'
                >
                  remove
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default CartItemsList_14;
