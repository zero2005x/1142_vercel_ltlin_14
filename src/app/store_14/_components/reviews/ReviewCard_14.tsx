import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Comment_14 from './Comment_14';
import Rating_14 from './Rating_14';

type ReviewCardProps = {
  reviewInfo: {
    comment: string;
    rating: number;
    name: string;
    image: string;
  };
  children?: React.ReactNode;
};

function ReviewCard_14({ reviewInfo, children }: ReviewCardProps) {
  return (
    <Card className='relative'>
      <CardHeader>
        <div className='flex items-center'>
          <Image
            src={reviewInfo.image}
            alt={reviewInfo.name}
            width={48}
            height={48}
            className='h-12 w-12 rounded-full object-cover'
          />
          <div className='ml-4'>
            <h3 className='mb-1 text-sm font-bold capitalize'>
              {reviewInfo.name}
            </h3>
            <Rating_14 rating={reviewInfo.rating} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Comment_14 comment={reviewInfo.comment} />
      </CardContent>
      <div className='absolute right-3 top-3'>{children}</div>
    </Card>
  );
}

export default ReviewCard_14;
