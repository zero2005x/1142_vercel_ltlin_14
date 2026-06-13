import { notFound } from 'next/navigation';
import Image from 'next/image';
import { auth } from '@clerk/nextjs/server';
import { fetchSingleProduct_14, findExistingReview } from '../../_utils/action';
import { formatCurrency } from '../../_utils/format';
import BreadCrumbs_14 from '../../_components/single-product/BreadCrumbs_14';
import FavoriteToggleButton_14 from '../../_components/products/FavoriteToggleButton_14';
import AddToCart_14 from '../../_components/single-product/AddToCart_14';
import ProductRating_14 from '../../_components/single-product/ProductRating_14';
import ShareButton_14 from '../../_components/single-product/ShareButton_14';
import ProductReviews_14 from '../../_components/reviews/ProductReviews_14';
import SubmitReview_14 from '../../_components/reviews/SubmitReview_14';

type Props = {
  params: Promise<{ id: string }>;
};

const SingleProductPage_14 = async ({ params }: Props) => {
  const { id } = (await params) ?? { id: '' };
  if (!id) notFound();
  const product = await fetchSingleProduct_14(id);

  if (!product) notFound();

  const { name, image, company, description, price } = product;
  const dollarsAmount = formatCurrency(price);
  const { userId } = await auth();
  const reviewDoesNotExist =
    userId && !(await findExistingReview(userId, product.id));

  return (
    <section>
      <BreadCrumbs_14 name={name} />
      <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
        {/* IMAGE FIRST COL */}
        <div className='relative min-h-[420px]'>
          <Image
            src={image}
            alt={name}
            fill
            sizes='(max-width:768px) 100vw,(max-width:1200px) 50vw,33vw'
            priority
            className='w-full rounded-md object-cover'
          />
        </div>
        {/* PRODUCT INFO SECOND COL */}
        <div>
          <div className='flex flex-wrap items-center gap-4'>
            <h1 className='capitalize text-3xl font-bold'>{name}</h1>
            <FavoriteToggleButton_14 productId={id} />
            <ShareButton_14 name={name} productId={id} />
          </div>
          <ProductRating_14 productId={id} />
          <h4 className='text-xl mt-2'>{company}</h4>
          <p className='mt-3 text-md bg-muted inline-block p-2 rounded-md'>
            {dollarsAmount}
          </p>
          <p className='mt-6 leading-8 text-muted-foreground'>{description}</p>
          <AddToCart_14 productId={id} />
        </div>
      </div>
      <ProductReviews_14 productId={id} />
      {reviewDoesNotExist && <SubmitReview_14 productId={id} />}
    </section>
  );
};

export default SingleProductPage_14;
