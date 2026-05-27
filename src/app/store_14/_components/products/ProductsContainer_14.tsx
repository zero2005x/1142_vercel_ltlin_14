import ProductsGrid_14 from './ProductsGrid_14';
import ProductsList_14 from './ProductsList_14';
import { LuLayoutGrid, LuList } from 'react-icons/lu';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { fetchAllProducts_14 } from '../../_utils/action';

async function ProductsContainer_14({
  layout,
  search,
}: {
  layout: string;
  search?: string;
}) {
  const products = await fetchAllProducts_14({ search });
  const totalProducts = products.length;
  return (
    <>
      {/* HEADER */}
      <section>
        <div className='flex justify-between items-center'>
          <h4 className='font-medium text-lg'>
            {totalProducts} product{totalProducts > 1 ? 's' : ''}
          </h4>
          <div className='flex gap-x-4'>
            <Button
              variant={layout === 'grid' ? 'default' : 'ghost'}
              size='icon'
              asChild
            >
              <Link
                href={`/store_14/products_14?layout=grid${
                  search ? `&search=${encodeURIComponent(search)}` : ''
                }`}
              >
                <LuLayoutGrid />
              </Link>
            </Button>
            <Button
              variant={layout === 'list' ? 'default' : 'ghost'}
              size='icon'
              asChild
            >
              <Link
                href={`/store_14/products_14?layout=list${
                  search ? `&search=${encodeURIComponent(search)}` : ''
                }`}
              >
                <LuList />
              </Link>
            </Button>
          </div>
        </div>
        <Separator className='mt-4' />
      </section>
      {/* PRODUCTS */}
      <div>
        {totalProducts === 0 ? (
          <div className='text-2xl mt-16 py-20'>
            <p className='text-center text-muted-foreground'>
              No products found.
            </p>
          </div>
        ) : layout === 'grid' ? (
          <ProductsGrid_14 products={products} />
        ) : (
          <ProductsList_14 products={products} />
        )}
      </div>
    </>
  );
}
export default ProductsContainer_14;
