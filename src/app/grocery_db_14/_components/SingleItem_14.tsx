'use client';

import { useTransition } from 'react';
import { removeGroceryItem, toggleGroceryItem } from '../../../actions/grocery_action_14';

interface SingleItemProps {
  item: { id: string; name: string; completed: boolean };
}

const SingleItem_14 = ({ item }: SingleItemProps) => {
  const [isPending, startTransition] = useTransition();
  const deleteAction = removeGroceryItem.bind(null, item.id);

  return (
    <div className='single-item' style={{ opacity: isPending ? 0.6 : 1 }}>
      <input
        type='checkbox'
        checked={item.completed}
        onChange={() =>
          startTransition(() => toggleGroceryItem(item.id, !item.completed))
        }
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.completed ? 'line-through' : undefined,
        }}
      >
        {item.name}
      </p>
      <form action={deleteAction}>
        <button type='submit' className='bg-red-500 text-white p-2 text-xs rounded'>
          delete
        </button>
      </form>
    </div>
  );
};
export default SingleItem_14;
