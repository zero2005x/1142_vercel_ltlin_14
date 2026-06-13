'use client';

import { usePathname } from 'next/navigation';
import FormContainer from '../form/FormContainer';
import { CardSubmitButton } from '../form/Buttons';
import { toggleFavoriteAction } from '../../_utils/action';

function FavoriteToggleForm_14({
  favoriteId,
  productId,
}: {
  favoriteId: string | null;
  productId: string;
}) {
  const pathname = usePathname();
  return (
    <FormContainer action={toggleFavoriteAction}>
      <input type='hidden' name='productId' value={productId} />
      <input type='hidden' name='favoriteId' value={favoriteId ?? ''} />
      <input type='hidden' name='pathname' value={pathname} />
      <CardSubmitButton isFavorite={favoriteId !== null} />
    </FormContainer>
  );
}

export default FavoriteToggleForm_14;
