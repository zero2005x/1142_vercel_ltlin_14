import { deleteProduct_14 } from '../../_utils/action';

type DeleteProductProps = {
  pid: string;
};

const DeleteProduct_14 = ({ pid }: DeleteProductProps) => {
  return (
    <form action={deleteProduct_14}>
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
