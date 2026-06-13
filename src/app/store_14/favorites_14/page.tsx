import { fetchUserFavorites } from '../_utils/action';
import ProductsGrid_14 from '../_components/products/ProductsGrid_14';
import SectionTitle from '../_components/global/SectionTitle';
import EmptyList from '../_components/global/EmptyList';

const FavoritesPage_14 = async () => {
  const favorites = await fetchUserFavorites();

  if (favorites.length === 0) {
    return <EmptyList heading='You have no favorites yet.' />;
  }

  return (
    <section>
      <SectionTitle text='Your favorites' />
      <ProductsGrid_14 products={favorites.map((favorite) => favorite.product)} />
    </section>
  );
};

export default FavoritesPage_14;

