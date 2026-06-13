import { FaRegStar, FaStar } from 'react-icons/fa';

function Rating_14({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1 <= rating);

  return (
    <div className='flex items-center gap-x-1'>
      {stars.map((isFilled, index) => {
        const className = `h-3 w-3 ${
          isFilled ? 'text-primary' : 'text-muted-foreground'
        }`;
        return isFilled ? (
          <FaStar className={className} key={index} />
        ) : (
          <FaRegStar className={className} key={index} />
        );
      })}
    </div>
  );
}

export default Rating_14;
