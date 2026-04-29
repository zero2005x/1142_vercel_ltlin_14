import { seedMidtermData } from '@/actions/shop.action_14';

export default async function SeedPage() {
  const result = await seedMidtermData();
  return (
    <div className='p-4'>
      <h1 className='text-2xl mb-4'>Seed Database</h1>
      <p>{result.message}</p>
    </div>
  );
}