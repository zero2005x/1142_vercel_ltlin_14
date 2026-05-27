import { notFound } from 'next/navigation';
import Image from 'next/image';
import { fetchSingleProduct_14 } from '../../_utils/action';
import { formatCurrency } from '../../_utils/format';
import SectionTitle from '../../_components/global/SectionTitle';
import FavoriteToggleButton_14 from '../../_components/products/FavoriteToggleButton_14';

type Props = {
  params: Promise<{ id: string }>;
};

const SingleProductPage_14 = async ({ params }: Props) => {
  const { id } = await params;
  const product = await fetchSingleProduct_14(id);

  if (!product) notFound();

  const { name, image, company, description, price } = product;

  return (
    <section>
      <SectionTitle text={name} />
      <div className='mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16'>
        {/* image */}
        <div className='relative h-full rounded-md overflow-hidden'>
          <Image
            src={image}
            alt={name}
            fill
            sizes='(min-width: 1024px) 50vw, 100vw'
            priority
            className='object-cover w-full rounded-md'
          />
        </div>
        {/* product info */}
        <div className='flex flex-col gap-y-4'>
          <div className='flex gap-x-8 items-center'>
            <h1 className='capitalize text-3xl font-bold'>{name}</h1>
            <FavoriteToggleButton_14 productId={id} />
          </div>
          <p className='text-xl text-muted-foreground capitalize'>{company}</p>
          <p className='mt-2 text-2xl font-semibold'>{formatCurrency(price)}</p>
          <p className='mt-6 leading-8 text-muted-foreground'>{description}</p>
        </div>
      </div>
    </section>
  );
};

export default SingleProductPage_14;
