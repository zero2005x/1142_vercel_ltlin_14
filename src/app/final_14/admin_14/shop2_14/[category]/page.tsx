import Link from 'next/link';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { IconButton } from '../../../_components/form/Buttons';
import FormContainer from '../../../_components/form/FormContainer';
import { formatCurrency } from '../../../_utils/format';
import {
  fetchProductsByCategory_14,
  deleteProductAction,
} from '../../../_utils/action';

export const dynamic = 'force-dynamic';

const FetchProductsByCategory_14 = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  console.log('category param:', category);

  const items = await fetchProductsByCategory_14(category);
  console.log('products by category:', items);

  return (
    <section>
      <div className='space-y-2'>
        <div className='flex items-center justify-between mr-16'>
          <h1 className='text-2xl text-bold capitalize'>{category}</h1>
          <div className='flex items-center gap-x-4'></div>
        </div>
      </div>
      <Separator className='my-4' />
      <Table>
        <TableCaption className='capitalize'>
          total products : {items.length}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Product ID</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Category ID</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items?.map((item) => {
            const { pid, pname, cat_id, price } = item;
            return (
              <TableRow key={pid}>
                <TableCell>
                  <Link href='#'>{pid}</Link>
                </TableCell>
                <TableCell>
                  <Link href='#'>{pname}</Link>
                </TableCell>
                <TableCell>{cat_id}</TableCell>
                <TableCell>{formatCurrency(price)}</TableCell>
                <TableCell className='flex items-center gap-x-2'>
                  <Link href={`/final_14/admin_14/shop2_14/edit/${pid}`}>
                    <IconButton actionType='edit' />
                  </Link>
                  <DeleteProduct pid={pid} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
};

function DeleteProduct({ pid }: { pid: string }) {
  const deleteProduct = deleteProductAction.bind(null, { pid });
  return (
    <FormContainer action={deleteProduct}>
      <IconButton actionType='delete' />
    </FormContainer>
  );
}

export default FetchProductsByCategory_14;
