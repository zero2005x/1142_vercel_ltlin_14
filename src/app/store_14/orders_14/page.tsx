import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import EmptyList from '../_components/global/EmptyList';
import SectionTitle from '../_components/global/SectionTitle';
import { fetchUserOrders } from '../_utils/action';
import { formatCurrency, formatDate } from '../_utils/format';

async function OrdersPage_14() {
  const orders = await fetchUserOrders();

  if (orders.length === 0) {
    return <EmptyList heading='You have no paid orders yet.' />;
  }

  return (
    <section>
      <SectionTitle text='your orders' />
      <Table>
        <TableCaption>Total Orders : {orders.length}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Products</TableHead>
            <TableHead>Order Total</TableHead>
            <TableHead>Tax</TableHead>
            <TableHead>Shipping</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const { products, orderTotal, tax, shipping, createdAt } = order;
            return (
              <TableRow key={order.id}>
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
    </section>
  );
}

export default OrdersPage_14;
