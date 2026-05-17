import EmptyList from '../global/EmptyList';
import SectionTitle from '../global/SectionTitle';
import ProductsGrid_14 from '../products/ProductsGrid_14';
import { fetchFeaturedProducts_14 } from '../../_utils/action';

async function FeaturedProducts_14() {
  const products = await fetchFeaturedProducts_14();

  return (
    <section className='pt-24'>
      <SectionTitle text='featured products' />
      {products.length === 0 ? (
        <EmptyList heading='No featured products found.' className='mt-8' />
      ) : (
        <ProductsGrid_14 products={products} />
      )}
    </section>
  );
}
export default FeaturedProducts_14;
