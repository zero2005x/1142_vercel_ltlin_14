'use client';
import { SeedBlog_14 } from '@/actions/blog.action_14';

const SeedBlogs_14 = () => {
  return (
    <button
      type='button'
      className='text-red-700 bg-red-200 hover:bg-red-300 capitalize px-4 py-2 text-base rounded'
      onClick={async () => {
        await SeedBlog_14();
      }}
    >
      Seed Blogs
    </button>
  );
};

export default SeedBlogs_14;
