'use client';

import { useState } from 'react';
import { seedMidtermData } from '@/actions/shop.action_14';
import { SeedBlog_14 } from '@/actions/blog.action_14';

export default function SeedPage() {
  const [shopMsg, setShopMsg] = useState('');
  const [blogMsg, setBlogMsg] = useState('');
  const [shopLoading, setShopLoading] = useState(false);
  const [blogLoading, setBlogLoading] = useState(false);

  const handleSeedShop = async () => {
    setShopLoading(true);
    try {
      const result = await seedMidtermData();
      setShopMsg(result.message);
    } catch (e: unknown) {
      setShopMsg(`Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    } finally {
      setShopLoading(false);
    }
  };

  const handleSeedBlog = async () => {
    setBlogLoading(true);
    try {
      const result = await SeedBlog_14();
      setBlogMsg(result?.message ?? 'Done');
    } catch (e: unknown) {
      setBlogMsg(`Error: ${e instanceof Error ? e.message : 'Unknown error'}`);
    } finally {
      setBlogLoading(false);
    }
  };

  return (
    <div className='p-8 max-w-lg'>
      <h1 className='text-2xl font-bold mb-6'>Seed Database -- ltlin, 913410014</h1>

      <div className='flex flex-col gap-6'>
        <div className='border rounded p-4'>
          <h2 className='font-semibold mb-2'>Shop Data (category_14 + shop_14)</h2>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50'
            onClick={handleSeedShop}
            disabled={shopLoading}
          >
            {shopLoading ? 'Seeding...' : 'Seed Shop Data'}
          </button>
          {shopMsg && <p className='mt-2 text-sm'>{shopMsg}</p>}
        </div>

        <div className='border rounded p-4'>
          <h2 className='font-semibold mb-2'>Blog Data (blog_14)</h2>
          <button
            className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50'
            onClick={handleSeedBlog}
            disabled={blogLoading}
          >
            {blogLoading ? 'Seeding...' : 'Seed Blog Data'}
          </button>
          {blogMsg && <p className='mt-2 text-sm'>{blogMsg}</p>}
        </div>
      </div>
    </div>
  );
}