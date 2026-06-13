import StorePlaceholderPage_14 from '../_components/global/StorePlaceholderPage_14';
import CheckoutRedirect_14 from './CheckoutRedirect_14';

type CheckoutPageProps = {
  searchParams: Promise<{
    orderId?: string;
    cartId?: string;
  }>;
};

async function CheckoutPage_14({ searchParams }: CheckoutPageProps) {
  const { orderId, cartId } = await searchParams;

  if (!orderId || !cartId) {
    return (
      <StorePlaceholderPage_14
        title='checkout'
        description='Missing checkout information. Please return to the cart and place the order again.'
      />
    );
  }

  return <CheckoutRedirect_14 orderId={orderId} cartId={cartId} />;
}

export default CheckoutPage_14;
