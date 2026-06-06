import FormContainer from '../form/FormContainer';
import { SubmitButton } from '../form/Buttons';
import { addToCartAction } from '../../_utils/action';

const AddToCart_14 = ({ productId }: { productId: string }) => {
  return (
    <div className='mt-8'>
      <FormContainer action={addToCartAction}>
        <input type='hidden' name='productId' value={productId} />
        <div className='mb-4 flex items-center gap-x-3'>
          <label htmlFor='amount' className='capitalize text-md'>
            amount
          </label>
          <select
            id='amount'
            name='amount'
            defaultValue={1}
            className='rounded-md border bg-background p-2'
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <SubmitButton text='add to cart' size='lg' className='capitalize' />
      </FormContainer>
    </div>
  );
};
export default AddToCart_14;
