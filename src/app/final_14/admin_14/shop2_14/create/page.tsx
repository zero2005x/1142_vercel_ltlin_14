import FormInput from '../../../_components/form/FormInput';
import { SubmitButton } from '../../../_components/form/Buttons';
import FormContainer from '../../../_components/form/FormContainer';
import { createProductAction2 } from '../../../_utils/action';
import PriceInput from '../../../_components/form/PriceInput';

export const dynamic = 'force-dynamic';

const CreateProductPage = () => {
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>create product</h1>
      <div className='border p-8 rounded-md'>
        <FormContainer action={createProductAction2}>
          <div className='grid gap-4 md:grid-cols-2 my-4'>
            <FormInput
              type='text'
              name='pname'
              label='Product Name'
              defaultValue=''
            />
            <FormInput
              type='number'
              name='cat_id'
              label='Category ID'
              defaultValue=''
            />
            <FormInput
              type='text'
              name='img_url'
              label='Local ImageUrl'
              defaultValue='/images/midterm/homepage/hats.png'
            />
            <FormInput
              type='text'
              name='remote_img_url'
              label='Remote ImageUrl'
              defaultValue='https://i.ibb.co/cvpntL1/hats.png'
            />
            <PriceInput />
          </div>
          <SubmitButton text='create product' className='mt-8' />
        </FormContainer>
      </div>
    </section>
  );
};
export default CreateProductPage;
