import { deleteAllBlog_xx } from '@/actions/blog.action_xx';

const DeleteAllBlogs_xx = () => {
  return (
    <form action={deleteAllBlog_xx}>
      <button
        type='submit'
        className='text-red-700 bg-red-200 hover:bg-red-300 capitalize px-4 py-2 text-base rounded'
      >
        delete all blogs
      </button>
    </form>
  );
};

export default DeleteAllBlogs_xx;
