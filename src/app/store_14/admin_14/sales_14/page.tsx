import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { formatCurrency, formatDate } from '../../_utils/format';
import { fetchAdminOrders } from '../../_utils/action';

async function SalesPage() {
  const orders = await fetchAdminOrders();
  return (
    <Table>
      <TableCaption>Total Orders : {orders?.length ?? 0}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Products</TableHead>
          <TableHead>Order Total</TableHead>
          <TableHead>Tax</TableHead>
          <TableHead>Shipping</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders?.map((order) => {
          const { products, orderTotal, tax, shipping, createdAt, email } =
            order;
          return (
            <TableRow key={order.id}>
              <TableCell>{email}</TableCell>
              <TableCell>{products}</TableCell>
              <TableCell>{formatCurrency(orderTotal)}</TableCell>
              <TableCell>{formatCurrency(tax)}</TableCell>
              <TableCell>{formatCurrency(shipping)}</TableCell>
              <TableCell>{formatDate(createdAt)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
export default SalesPage;
