import {
  fetchAdminProductDetails,
  updateProductAction,
} from '../../../../_utils/action';
import FormContainer from '../../../../_components/form/FormContainer';
import FormInput from '../../../../_components/form/FormInput';
import PriceInput from '../../../../_components/form/PriceInput';
import TextAreaInput from '../../../../_components/form/TextAreaInput';
import CheckboxInput from '../../../../_components/form/CheckboxInput';
import { SubmitButton } from '../../../../_components/form/Buttons';

async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchAdminProductDetails(id);
  const { name, company, description, price, image, featured } = product;

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>update product</h1>
      <div className='border p-8 rounded-md'>
        <FormContainer action={updateProductAction}>
          <input type='hidden' name='id' value={id} />
          <div className='grid gap-4 md:grid-cols-2 my-4'>
            <FormInput
              type='text'
              name='name'
              label='product name'
              defaultValue={name}
            />
            <FormInput
              type='text'
              name='company'
              defaultValue={company}
            />
            <PriceInput defaultValue={price} />
            <FormInput
              type='text'
              name='image'
              label='image url'
              defaultValue={image}
            />
          </div>
          <TextAreaInput
            name='description'
            labelText='product description'
            defaultValue={description}
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
}

export default EditProductPage;
