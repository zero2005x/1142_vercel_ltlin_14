import EmptyList from '../../_components/global/EmptyList';

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
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { IconButton } from '../../_components/form/Buttons';
import FormContainer from '../../_components/form/FormContainer';
import { formatCurrency } from '../../_utils/format';
import { fetchAdminShops, deleteProductAction } from '../../_utils/action';

export const dynamic = 'force-dynamic';

async function AdminShopsPage() {
  const items = await fetchAdminShops();
  console.log('admin shops', items);
  return (
    <section>
      <div className='space-y-2'>
        <div className='flex items-center justify-between mr-16'>
          <h1 className='text-2xl text-bold'>Shops_14</h1>
          <div className='flex items-center gap-x-4'>
            <Button asChild variant='default'>
              <Link href='/final_14/admin_14/shop2_14/create'>Create New</Link>
            </Button>
          </div>
        </div>
      </div>
      <Separator className='my-4' />
      <Table>
        <TableCaption className='capitalize'>
          total shops : {items.length}
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
}

function DeleteProduct({ pid }: { pid: string }) {
  const deleteProduct = deleteProductAction.bind(null, { pid });
  return (
    <FormContainer action={deleteProduct}>
      <IconButton actionType='delete' />
    </FormContainer>
  );
}

export default AdminShopsPage;
