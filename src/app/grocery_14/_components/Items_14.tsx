import SingleItem from './SingleItem_14';

interface ItemsProps {
  items: { id: string; name: string; completed: boolean }[];
  removeItem: (id: string) => void;
  editItem: (id: string) => void;
}

const Items = ({ items, removeItem, editItem }: ItemsProps) => {
  return (
    <div className='items'>
      {items.map((item) => {
        return (
          <SingleItem
            key={item.id}
            item={item}
            removeItem={removeItem}
            editItem={editItem}
          />
        );
      })}
    </div>
  );
};
export default Items;
