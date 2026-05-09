import SingleItem from './SingleItem_14';

interface ItemsProps {
  items: { id: string; name: string; completed: boolean }[];
}

const Items = ({ items }: ItemsProps) => {
  return (
    <div className='items'>
      {items.map((item) => (
        <SingleItem key={item.id} item={item} />
      ))}
    </div>
  );
};
export default Items;
