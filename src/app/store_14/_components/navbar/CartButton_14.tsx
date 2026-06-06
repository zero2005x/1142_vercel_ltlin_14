import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LuShoppingCart } from 'react-icons/lu';
import { fetchCartItems } from '../../_utils/action';

const CartButton_14 = async () => {
  const numItemsInCart = await fetchCartItems();
  return (
    <Button asChild variant={'secondary'} size='icon' className='flex justify-center items-center relative'>
      <Link href="/store_14/cart_14"
      className="flex items-center gap-1">
        <LuShoppingCart />
        {numItemsInCart > 0
        &&
        <span
        className='absolute -top-2 -right-1 bg-primary h-4 w-4 text-white rounded-full flex justify-center items-center text-xs'>
          {numItemsInCart}
          </span>}
      </Link>
    </Button>
  );
};
export default CartButton_14;
