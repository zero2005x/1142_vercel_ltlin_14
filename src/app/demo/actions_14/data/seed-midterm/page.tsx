import { seedMidtermData } from '@/actions/shop.action_14';

export default function SeedPage() {
  return (
    <div className='p-4'>
      <h1 className='text-2xl mb-4'>Seed Database</h1>
      <form action={seedMidtermData}>
        <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
          Seed Data
        </button>
      </form>
    </div>
  );
}
