import FormInput from '../../../_components/form/FormInput';
import { SubmitButton } from '../../../_components/form/Buttons';
import FormContainer from '../../../_components/form/FormContainer';
import { createBlogAction2 } from '../../../_utils/action';
import ImageInput from '../../../_components/form/ImageInput';
import PriceInput from '../../../_components/form/PriceInput';
import TextAreaInput from '../../../_components/form/TextAreaInput';
// import { faker } from '@faker-js/faker';
import CheckboxInput from '../../../_components/form/CheckboxInput';

export const dynamic = 'force-dynamic';

const CreateBlogPage = () => {
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>create blog</h1>
      <div className='border p-8 rounded-md'>
        <FormContainer action={createBlogAction2}>
          <div className='grid gap-4 md:grid-cols-2 my-4'>
            <FormInput
              type='text'
              name='title'
              label='blog title'
              defaultValue=''
            />
            <FormInput
              type='text'
              name='category'
              label='category'
              defaultValue=''
            />
            <FormInput
              type='text'
              name='img'
              label='Local ImageUrl'
              defaultValue={`/images/photo-1.jpg`}
            />
            <FormInput
              type='text'
              name='remote_img'
              label='Remote ImageUrl'
              defaultValue={`https://example.com/images/photo-1.jpg`}
            />
          </div>
          <TextAreaInput
            name='descrip'
            labelText='blog description'
            defaultValue='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          />
          <div>
            <CheckboxInput name='featured' label='featured' />
          </div>

          <SubmitButton text='create blog' className='mt-8' />
        </FormContainer>
      </div>
    </section>
  );
};
export default CreateBlogPage;
