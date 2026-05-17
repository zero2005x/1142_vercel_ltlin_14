import { formatCurrency } from '../../_utils/format';
import { Product } from '../../_utils/action';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const ProductsGrid_14 = ({ products }: { products: Product[] }) => {
  return (
    <div className='grid gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-3'>
      {products.map((product) => (
        <Card key={product.id} className='rounded-lg py-0'>
          <div className='relative aspect-square overflow-hidden rounded-t-lg bg-muted'>
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes='(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
              className='object-cover transition-transform duration-300 hover:scale-105'
            />
          </div>
          <CardContent className='space-y-2 p-4'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <h3 className='font-medium capitalize'>{product.name}</h3>
                <p className='text-sm capitalize text-muted-foreground'>
                  {product.company}
                </p>
              </div>
              <p className='font-medium'>{formatCurrency(product.price)}</p>
            </div>
            <p className='line-clamp-2 text-sm text-muted-foreground'>
              {product.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default ProductsGrid_14;
