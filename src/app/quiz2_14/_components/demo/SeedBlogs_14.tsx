import { SeedBlog_14 } from '../../_utils/action';

const SeedBlogs_14 = () => {
  return (
    <form action={SeedBlog_14}>
      <button
        type='submit'
        className='text-blue-700 bg-blue-200 hover:bg-blue-300 capitalize px-2 py-1 text-base rounded'
      >
        seed all
      </button>
    </form>
  );
};

export default SeedBlogs_14;
