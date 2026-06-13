import { auth } from '@clerk/nextjs/server';
import { fetchFavoriteId } from '../../_utils/action';
import { CardSignInButton } from '../form/Buttons';
import FavoriteToggleForm_14 from './FavoriteToggleForm_14';

const FavoriteToggleButton_14 = async ({ productId }: { productId: string }) => {
  const { userId } = await auth();
  if (!userId) return <CardSignInButton />;

  const favoriteId = await fetchFavoriteId({ productId });
  return <FavoriteToggleForm_14 favoriteId={favoriteId} productId={productId} />;
};

export default FavoriteToggleButton_14;

