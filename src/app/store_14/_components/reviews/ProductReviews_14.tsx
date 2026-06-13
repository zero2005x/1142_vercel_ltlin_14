import EmptyList from '../global/EmptyList';
import SectionTitle from '../global/SectionTitle';
import { fetchProductReviews } from '../../_utils/action';
import ReviewCard_14 from './ReviewCard_14';

async function ProductReviews_14({ productId }: { productId: string }) {
  const reviews = await fetchProductReviews(productId);

  return (
    <div className='mt-16'>
      <SectionTitle text='product reviews' />
      {reviews.length === 0 ? (
        <EmptyList heading='No reviews yet.' className='mt-8' />
      ) : (
        <div className='my-8 grid gap-8 md:grid-cols-2'>
          {reviews.map((review) => {
            const reviewInfo = {
              comment: review.comment,
              rating: review.rating,
              image: review.authorImageUrl,
              name: review.authorName,
            };

            return <ReviewCard_14 key={review.id} reviewInfo={reviewInfo} />;
          })}
        </div>
      )}
    </div>
  );
}

export default ProductReviews_14;
