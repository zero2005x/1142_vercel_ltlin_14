import EmptyList from '../_components/global/EmptyList';
import SectionTitle from '../_components/global/SectionTitle';
import FormContainer from '../_components/form/FormContainer';
import { IconButton } from '../_components/form/Buttons';
import ReviewCard_14 from '../_components/reviews/ReviewCard_14';
import {
  deleteReviewAction,
  fetchProductReviewsByUser,
} from '../_utils/action';

async function ReviewsPage_14() {
  const reviews = await fetchProductReviewsByUser();

  if (reviews.length === 0) {
    return <EmptyList heading='You have no reviews yet.' />;
  }

  return (
    <section>
      <SectionTitle text='your reviews' />
      <div className='my-8 grid gap-8 md:grid-cols-2'>
        {reviews.map((review) => {
          const reviewInfo = {
            comment: review.comment,
            rating: review.rating,
            name: review.product.name,
            image: review.product.image,
          };

          return (
            <ReviewCard_14 key={review.id} reviewInfo={reviewInfo}>
              <DeleteReview_14 reviewId={review.id} />
            </ReviewCard_14>
          );
        })}
      </div>
    </section>
  );
}

function DeleteReview_14({ reviewId }: { reviewId: string }) {
  return (
    <FormContainer action={deleteReviewAction}>
      <input type='hidden' name='reviewId' value={reviewId} />
      <IconButton actionType='delete' />
    </FormContainer>
  );
}

export default ReviewsPage_14;
