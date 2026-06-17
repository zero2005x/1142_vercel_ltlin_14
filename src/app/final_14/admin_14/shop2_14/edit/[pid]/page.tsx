import {
  fetchAdminProductDetails,
  updateProductAction,
} from '../../../../_utils/action';
import FormContainer from '../../../../_components/form/FormContainer';
import FormInput from '../../../../_components/form/FormInput';
import PriceInput from '../../../../_components/form/PriceInput';
import { SubmitButton } from '../../../../_components/form/Buttons';

export const dynamic = 'force-dynamic';

const EditProductPage_14 = async ({
  params,
}: {
  params: Promise<{ pid: string }>;
}) => {
  const { pid } = await params;
  const product = await fetchAdminProductDetails(pid);
  console.log('product details', product);
  const { pname, cat_id, price, img_url, remote_img_url } = product;
  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>update product</h1>
      <div className='border p-8 rounded-md'>
        <FormContainer action={updateProductAction}>
          <div className='grid gap-4 md:grid-cols-2 my-4'>
            <input type='hidden' name='id' value={pid} />
            <FormInput
              type='text'
              name='pname'
              label='Product Name'
              defaultValue={pname ?? undefined}
            />
            <FormInput
              type='number'
              name='cat_id'
              label='Category ID'
              defaultValue={cat_id?.toString()}
            />
            <FormInput
              type='text'
              name='img_url'
              label='Local ImageUrl'
              defaultValue={img_url ?? undefined}
            />
            <FormInput
              type='text'
              name='remote_img_url'
              label='Remote ImageUrl'
              defaultValue={remote_img_url ?? undefined}
            />
            <PriceInput defaultValue={price ?? undefined} />
          </div>
          <SubmitButton text='update product' className='mt-8' />
        </FormContainer>
      </div>
    </section>
  );
};
export default EditProductPage_14;
