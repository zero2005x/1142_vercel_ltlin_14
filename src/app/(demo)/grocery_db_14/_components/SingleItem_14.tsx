import DeleteButton_14 from './DeleteButton_14';

interface SingleItem_14Props {
  item: { id: string; name: string; completed: boolean };
  removeItem: (id: string) => void;
  editItem: (id: string) => void;
}

const SingleItem_14 = ({ item, removeItem, editItem }: SingleItem_14Props) => {
  return (
    <div className='single-item'>
      <input
        type='checkbox'
        checked={item.completed}
        onChange={() => editItem(item.id)}
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.completed ? 'line-through' : undefined,
        }}
      >
        {item.name}
      </p>
      <DeleteButton_14 removeItem={removeItem} id={item.id} />
    </div>
  );
};
export default SingleItem_14;
