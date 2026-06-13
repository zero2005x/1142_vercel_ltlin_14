import { FaStar } from 'react-icons/fa';
import { fetchProductRating } from '../../_utils/action';

const ProductRating_14 = async ({ productId }: { productId: string }) => {
  const { rating, count } = await fetchProductRating(productId);

  const className = `flex gap-1 items-center text-md mt-1 mb-4`;
  const countValue = count === 1 ? '(1) review' : `(${count}) reviews`;
  return (
    <span className={className}>
      <FaStar className='w-3 h-3' />
      {rating} {countValue}
    </span>
  );
};

export default ProductRating_14;
