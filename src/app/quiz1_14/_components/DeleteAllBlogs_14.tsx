'use client';
import { deleteAllBlog_14 } from '@/actions/blog.action_14';

const DeleteAllBlogs_14 = () => {
  return (
    <button
      type='button'
      className='text-blue-700 bg-blue-200 hover:bg-blue-300 capitalize px-4 py-2 text-base rounded'
      onClick={async () => {
        if (confirm('Are you sure you want to clear all blogs?')) {
          await deleteAllBlog_14();
        }
      }}
    >
      Clear All Blogs
    </button>
  );
};

export default DeleteAllBlogs_14;
