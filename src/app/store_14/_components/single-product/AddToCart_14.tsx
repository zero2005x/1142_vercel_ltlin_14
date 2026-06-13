'use client';

import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import FormContainer from '../form/FormContainer';
import { ProductSignInButton, SubmitButton } from '../form/Buttons';
import { addToCartAction } from '../../_utils/action';
import SelectProductAmount_14, { Mode_14 } from './SelectProductAmount_14';

const AddToCart_14 = ({ productId }: { productId: string }) => {
  const [amount, setAmount] = useState(1);
  const { userId } = useAuth();

  return (
    <div className='mt-8'>
      <SelectProductAmount_14
        mode={Mode_14.SingleProduct}
        amount={amount}
        setAmount={setAmount}
      />
      {userId ? (
        <FormContainer action={addToCartAction}>
          <input type='hidden' name='productId' value={productId} />
          <input type='hidden' name='amount' value={amount} />
          <SubmitButton text='add to cart' size='lg' className='mt-8 capitalize' />
        </FormContainer>
      ) : (
        <ProductSignInButton />
      )}
    </div>
  );
};
export default AddToCart_14;
