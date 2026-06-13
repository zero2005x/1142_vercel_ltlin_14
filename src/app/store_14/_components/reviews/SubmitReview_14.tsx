'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FormContainer from '../form/FormContainer';
import TextAreaInput from '../form/TextAreaInput';
import { SubmitButton } from '../form/Buttons';
import { createReviewAction } from '../../_utils/action';
import RatingInput_14 from './RatingInput_14';

function SubmitReview_14({ productId }: { productId: string }) {
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);

  return (
    <div className='mt-12'>
      <Button
        type='button'
        size='lg'
        className='capitalize'
        onClick={() => setIsReviewFormVisible((current) => !current)}
      >
        leave review
      </Button>
      {isReviewFormVisible && (
        <Card className='mt-8 p-8'>
          <FormContainer action={createReviewAction}>
            <input type='hidden' name='productId' value={productId} />
            <RatingInput_14 name='rating' />
            <TextAreaInput
              name='comment'
              labelText='feedback'
              defaultValue='Outstanding product with a smooth shopping experience.'
            />
            <SubmitButton className='mt-4' />
          </FormContainer>
        </Card>
      )}
    </div>
  );
}

export default SubmitReview_14;
