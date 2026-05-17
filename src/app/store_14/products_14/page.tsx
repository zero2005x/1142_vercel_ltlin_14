import EmptyList from '../_components/global/EmptyList';
import SectionTitle from '../_components/global/SectionTitle';
import ProductsGrid_14 from '../_components/products/ProductsGrid_14';
import { fetchAllProducts_14 } from '../_utils/action';

const ProductsPage_14 = async () => {
  const products = await fetchAllProducts_14();

  return (
    <section>
      <SectionTitle text='products' />
      {products.length === 0 ? (
        <EmptyList heading='No products found.' className='mt-8' />
      ) : (
        <ProductsGrid_14 products={products} />
      )}
    </section>
  );
};

export default ProductsPage_14;
