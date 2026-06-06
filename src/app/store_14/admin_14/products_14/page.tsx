import EmptyList from '../../_components/global/EmptyList';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { formatCurrency } from '../../_utils/format';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { IconButton } from '../../_components/form/Buttons';
import FormContainer from '../../_components/form/FormContainer';
import {
  fetchAdminProducts,
  deleteProductAction,
} from '../../_utils/action';

async function AdminProductsPage() {
  const items = await fetchAdminProducts();

  if (!items || items.length === 0)
    return <EmptyList heading='no products found' />;

  return (
    <section>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-2xl font-semibold capitalize'>manage products</h1>
        <Button asChild size='sm'>
          <Link href='/store_14/admin_14/products_14/create'>
            Create Product
          </Link>
        </Button>
      </div>
      {!items || items.length === 0 ? (
        <EmptyList heading='no products found' />
      ) : (
        <Table>
          <TableCaption className='capitalize'>
            total products : {items.length}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => {
              const { id: productId, name, company, price } = item;
              return (
                <TableRow key={productId}>
                  <TableCell>
                    <Link
                      href={`/store_14/products_14/${productId}`}
                      className='underline text-muted-foreground tracking-wide capitalize'
                    >
                      {name}
                    </Link>
                  </TableCell>
                  <TableCell>{company}</TableCell>
                  <TableCell>{formatCurrency(price)}</TableCell>
                  <TableCell className='flex items-center gap-x-2'>
                    <Link
                      href={`/store_14/admin_14/products_14/${productId}/edit`}
                    >
                      <IconButton actionType='edit' />
                    </Link>
                    <FormContainer action={deleteProductAction}>
                      <input type='hidden' name='id' value={productId} />
                      <IconButton actionType='delete' />
                    </FormContainer>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </section>
  );
}

export default AdminProductsPage;
