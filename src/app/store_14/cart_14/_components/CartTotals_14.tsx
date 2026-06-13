import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '../../_utils/format';
import { createOrderAction } from '../../_utils/action';
import FormContainer from '../../_components/form/FormContainer';
import { SubmitButton } from '../../_components/form/Buttons';

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
    <div>
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
      <FormContainer action={createOrderAction}>
        <SubmitButton text='place order' className='mt-8 w-full' />
      </FormContainer>
    </div>
  );
}

export default CartTotals_14;
