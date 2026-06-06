import StorePlaceholderPage_14 from '../_components/global/StorePlaceholderPage_14';
import SectionTitle from '../_components/global/SectionTitle';
import { fetchCart } from '../_utils/action';
import CartItemsList_14 from './_components/CartItemsList_14';
import CartTotals_14 from './_components/CartTotals_14';

const CartPage_14 = async () => {
  const cart = await fetchCart();
  const { cartItems } = cart;

  if (!cartItems.length) {
    return (
      <StorePlaceholderPage_14
        title='cart'
        description='Your cart is empty. Browse the products and add something you like.'
      />
    );
  }

  return (
    <section>
      <SectionTitle text='shopping cart' />
      <div className='mt-8 grid gap-8 lg:grid-cols-12'>
        <div className='lg:col-span-8'>
          <CartItemsList_14 cartItems={cartItems} />
        </div>
        <div className='lg:col-span-4'>
          <CartTotals_14 cart={cart} />
        </div>
      </div>
    </section>
  );
};

export default CartPage_14;

