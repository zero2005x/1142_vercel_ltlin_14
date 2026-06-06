import { createProductAction } from '../../../_utils/action';
import FormContainer from '../../../_components/form/FormContainer';
import FormInput from '../../../_components/form/FormInput';
import PriceInput from '../../../_components/form/PriceInput';
import TextAreaInput from '../../../_components/form/TextAreaInput';
import CheckboxInput from '../../../_components/form/CheckboxInput';
import { SubmitButton } from '../../../_components/form/Buttons';



const AdminCreateProductPage = () => {
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>create product</h1>
      <div className='border p-8 rounded-md'>
        <FormContainer action={createProductAction}>
          <div className='grid gap-4 md:grid-cols-2 my-4'>
            <FormInput
              type='text'
              name='name'
              label='product name'
              placeholder='Air Max 90'
            />
            <FormInput
              type='text'
              name='company'
              placeholder='Nike'
            />
            <PriceInput />
            <FormInput
              type='url'
              name='image'
              label='image url'
              placeholder='https://example.com/image.jpg'
            />
          </div>
          <TextAreaInput
            name='description'
            labelText='product description'
          />
          <div className='mt-6'>
            <CheckboxInput name='featured' label='featured' />
          </div>
          <SubmitButton text='create product' className='mt-8' />
        </FormContainer>
      </div>
    </section>
  );
};

export default AdminCreateProductPage;