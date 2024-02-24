'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toggleFavourite } from '../../lib/actions';
import { checkIsUserFavourite } from '../../lib/data';

export default function AddToFavouritesForm({
  userEmail,
  cocktailId,
}: {
  userEmail: string;
  cocktailId: number;
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  console.log(userEmail, cocktailId, isFavorite, 'status');

  return (
    <form action={toggleFavourite}>
      <input type="hidden" name="userEmail" value={userEmail} />
      <input type="hidden" name="cocktailId" value={cocktailId} />

      <button type="submit">
        <Image
          src={
            isFavorite
              ? '/../../images/components/heart2.svg'
              : '/../../images/components/heart1.svg'
          }
          width={24}
          height={24}
          alt={isFavorite ? 'remove from favourites' : 'add to favourites'}
        />
      </button>
    </form>
  );
}
