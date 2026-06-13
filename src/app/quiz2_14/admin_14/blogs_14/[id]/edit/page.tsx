import {
  fetchAdminBlogDetails,
  updateBlogAction,
} from '../../../../_utils/action';
import FormContainer from '../../../../_components/form/FormContainer';
import FormInput from '../../../../_components/form/FormInput';
import TextAreaInput from '../../../../_components/form/TextAreaInput';
import { SubmitButton } from '../../../../_components/form/Buttons';
import CheckboxInput from '../../../../_components/form/CheckboxInput';

const EditBlogPage_14 = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const blog = await fetchAdminBlogDetails(id);
  console.log('blog details', blog);
  const { title, category, descrip, featured, img, remote_img } = blog;
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>update blog</h1>
      <div className='border p-8 rounded-md'>
        <FormContainer action={updateBlogAction}>
          <div className='grid gap-4 md:grid-cols-2 my-4'>
            <input type='hidden' name='id' value={id} />
            <FormInput
              type='text'
              name='title'
              label='blog title'
              defaultValue={title}
            />
            <FormInput
              type='text'
              name='category'
              label='category'
              defaultValue={category}
            />
            <FormInput
              type='text'
              name='img'
              label='Local ImageUrl'
              defaultValue={img}
            />
            <FormInput
              type='text'
              name='remote_img'
              label='Remote ImageUrl'
              defaultValue={remote_img}
            />
          </div>
          <TextAreaInput
            name='descrip'
            labelText='product description'
            defaultValue={descrip}
          />
          <div className='mt-6'>
            <CheckboxInput
              name='featured'
              label='featured'
              defaultChecked={featured}
            />
          </div>
          <SubmitButton text='update product' className='mt-8' />
        </FormContainer>
      </div>
    </section>
  );
};
export default EditBlogPage_14;
