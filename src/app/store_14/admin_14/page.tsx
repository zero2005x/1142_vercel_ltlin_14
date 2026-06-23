import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { fetchChartData, fetchDashboardStats } from '../_utils/action';
import { formatCurrency } from '../_utils/format';
import Chart_14 from './Chart_14';

export const dynamic = 'force-dynamic';

const AdminDashboardPage_14 = async () => {
  const [stats, chartData] = await Promise.all([
    fetchDashboardStats(),
    fetchChartData(),
  ]);

  const cards = [
    { title: 'Total Sales', value: formatCurrency(stats.totalSales) },
    { title: 'Paid Orders', value: stats.ordersCount.toString() },
    { title: 'Products Sold', value: stats.productsSold.toString() },
  ];

  return (
    <section>
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {cards.map((card) => (
          <Card key={card.title}>
            <CardHeader>
              <CardDescription>{card.title}</CardDescription>
              <CardTitle className='text-3xl tabular-nums'>
                {card.value}
              </CardTitle>
            </CardHeader>
            <CardContent />
          </Card>
        ))}
      </div>
      <Chart_14 data={chartData} />
    </section>
  );
};

export default AdminDashboardPage_14;
