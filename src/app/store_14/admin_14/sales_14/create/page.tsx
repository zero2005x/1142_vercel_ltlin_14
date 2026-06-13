import { createSalesAction } from '../../../_utils/action';
import FormContainer from '../../../_components/form/FormContainer';
import FormInput from '../../../_components/form/FormInput';
import CheckboxInput from '../../../_components/form/CheckboxInput';
import { SubmitButton } from '../../../_components/form/Buttons';

export const dynamic = 'force-dynamic';

function CreateSalesPage_14() {
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>create sales</h1>
      <div className='border p-8 rounded-md'>
        <FormContainer action={createSalesAction}>
          <div className='grid gap-4 md:grid-cols-2 my-4'>
            <FormInput type='email' name='email' label='customer email' />
            <FormInput type='number' name='products' label='products' />
            <FormInput type='number' name='orderTotal' label='order total' />
            <FormInput type='number' name='tax' label='tax' defaultValue='0' />
            <FormInput
              type='number'
              name='shipping'
              label='shipping'
              defaultValue='0'
            />
          </div>
          <div className='mt-6'>
            <CheckboxInput name='isPaid' label='paid' />
          </div>
          <SubmitButton text='create sales' className='mt-8' />
        </FormContainer>
      </div>
    </section>
  );
}

export default CreateSalesPage_14;

