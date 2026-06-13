import { deleteAllBlog_14 } from '../../_utils/action';

const DeleteAllBlogs_14 = () => {
  return (
    <form action={deleteAllBlog_14}>
      <button
        type='submit'
        className='text-red-700 bg-red-200 hover:bg-red-300 capitalize px-2 py-1 text-base rounded'
      >
        delete all
      </button>
    </form>
  );
};

export default DeleteAllBlogs_14;
