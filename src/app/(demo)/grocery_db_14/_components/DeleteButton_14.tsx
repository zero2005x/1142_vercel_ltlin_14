'use client';

const DeleteButton_14 = ({ removeItem, id }: { removeItem: (id: string) => void; id: string }) => {
  return (
    <button
      className='btn remove-btn'
      type='button'
      onClick={() => removeItem(id)}
    >
      delete
    </button>
  );
};
export default DeleteButton_14;
