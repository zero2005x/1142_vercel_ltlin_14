import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '../../_utils/format';

type CartTotalsProps = {
  cartTotal: number;
  shipping: number;
  tax: number;
  orderTotal: number;
};

function Row({ label, amount }: { label: string; amount: number }) {
  return (
    <div className='flex items-center justify-between text-sm'>
      <span className='capitalize text-muted-foreground'>{label}</span>
      <span>{formatCurrency(amount)}</span>
    </div>
  );
}

function CartTotals_14({ cart }: { cart: CartTotalsProps }) {
  const { cartTotal, shipping, tax, orderTotal } = cart;
  return (
    <Card>
      <CardContent className='space-y-3 p-6'>
        <Row label='subtotal' amount={cartTotal} />
        <Row label='shipping' amount={shipping} />
        <Row label='tax' amount={tax} />
        <Separator className='my-2' />
        <div className='flex items-center justify-between font-semibold'>
          <span className='capitalize'>order total</span>
          <span>{formatCurrency(orderTotal)}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default CartTotals_14;
