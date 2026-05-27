import EmptyList from '../_components/global/EmptyList';
import SectionTitle from '../_components/global/SectionTitle';
import ProductsGrid_14 from '../_components/products/ProductsGrid_14';
import { fetchAllProducts_14 } from '../_utils/action';
import ProductsContainer_14 from '../_components/products/ProductsContainer_14';

const ProductsPage_14 = async ({searchParams}:
   { searchParams: 
    Promise<{layout? : string; search?:string}>}) => {
  const{layout = "grid", search} = await searchParams;

  return (
    <div className="p-4">
      <ProductsContainer_14 
      layout={layout} search={search} />
    </div>
  );
};

export default ProductsPage_14;
