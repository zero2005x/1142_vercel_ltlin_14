'use client';

import { deleteProductById_14 } from '@/actions/shop.action_14';

type DeleteProductProps = {
  pid: number;
};

const DeleteProduct_14 = ({ pid }: DeleteProductProps) => {
  return (
    <form
      action={async () => {
        await deleteProductById_14(pid);
      }}
    >
      <input type='hidden' name='id' value={pid} />
      <button
        type='submit'
        className='text-red-700 bg-red-200 hover:bg-red-300 capitalize px-4 py-2 text-base rounded'
      >
        delete
      </button>
    </form>
  );
};

export default DeleteProduct_14;
