'use client';

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { ChartDatum } from '../_utils/action';

function Chart_14({ data }: { data: ChartDatum[] }) {
  if (!data.length) {
    return (
      <p className='mt-8 text-muted-foreground'>
        No paid orders in the last six months yet. Sales will appear here once
        orders are completed.
      </p>
    );
  }

  return (
    <section className='mt-12'>
      <h1 className='text-4xl font-semibold text-center'>Monthly Sales</h1>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data} margin={{ top: 50 }}>
          <XAxis dataKey='date' />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey='amount' fill='#2563eb' barSize={75} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}

export default Chart_14;
