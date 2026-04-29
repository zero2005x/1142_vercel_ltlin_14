import { SeedBlog_xx } from '@/actions/blog.action_xx';

const SeedBlogs_xx = () => {
  return (
    <form action={SeedBlog_xx}>
      <button
        type='submit'
        className='text-blue-700 bg-blue-200 hover:bg-blue-300 capitalize px-4 py-2 text-base rounded'
      >
        seed blogs
      </button>
    </form>
  );
};

export default SeedBlogs_xx;
