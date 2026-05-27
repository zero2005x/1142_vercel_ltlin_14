import { FaRegHeart } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';

const FavoriteToggleButton_14 = ({ productId }: { productId: string }) => {
  return (
    <Button size='icon' variant='outline' className='p-2 cursor-pointer'>
      <FaRegHeart />
    </Button>
  );
};
export default FavoriteToggleButton_14;

