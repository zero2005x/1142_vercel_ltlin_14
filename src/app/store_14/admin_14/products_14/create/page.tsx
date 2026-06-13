import { createProductAction } from '../../../_utils/action';
import FormContainer from '../../../_components/form/FormContainer';
import FormInput from '../../../_components/form/FormInput';
import PriceInput from '../../../_components/form/PriceInput';
import TextAreaInput from '../../../_components/form/TextAreaInput';
import CheckboxInput from '../../../_components/form/CheckboxInput';
import ImageInput from '../../../_components/form/ImageInput';
import { SubmitButton } from '../../../_components/form/Buttons';

export const dynamic = 'force-dynamic';

const CreateProductPage = () => {
  return (
    <section>
      <h1 className='mb-8 text-2xl font-semibold capitalize'>create product</h1>
      <div className='rounded-md border p-8'>
        <FormContainer action={createProductAction}>
          <div className='my-4 grid gap-4 md:grid-cols-2'>
            <FormInput type='text' name='name' label='product name' />
            <FormInput type='text' name='company' />
            <ImageInput />
            <PriceInput />
          </div>
          <TextAreaInput name='description' labelText='product description' />
          <div className='mt-6'>
            <CheckboxInput name='featured' label='featured' />
          </div>
          <SubmitButton text='create product' className='mt-8' />
        </FormContainer>
      </div>
    </section>
  );
};

export default CreateProductPage;
