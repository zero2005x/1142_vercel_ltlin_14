'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export enum Mode_14 {
  SingleProduct = 'singleProduct',
  CartItem = 'cartItem',
}

type SelectProductAmountProps = {
  mode: Mode_14.SingleProduct;
  amount: number;
  setAmount: (value: number) => void;
};

type SelectCartItemAmountProps = {
  mode: Mode_14.CartItem;
  amount: number;
  setAmount: (value: number) => void;
  isLoading: boolean;
};

function SelectProductAmount_14(
  props: SelectProductAmountProps | SelectCartItemAmountProps
) {
  const cartItem = props.mode === Mode_14.CartItem;

  return (
    <div className='grid gap-2'>
      <Label htmlFor='amount' className='capitalize'>
        amount
      </Label>
      <Select
        value={props.amount.toString()}
        onValueChange={(value) => props.setAmount(Number(value))}
        disabled={cartItem ? props.isLoading : false}
      >
        <SelectTrigger
          id='amount'
          className={cartItem ? 'w-[100px]' : 'w-[150px]'}
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: cartItem ? props.amount + 10 : 10 }, (_, index) => {
            const selectValue = (index + 1).toString();
            return (
              <SelectItem key={selectValue} value={selectValue}>
                {selectValue}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
}

export default SelectProductAmount_14;
