'use client';

import Image from 'next/image';
import { useState } from 'react';
import { toggleFavourite } from '../../lib/actions';

export default function AddToFavouritesForm({
  userEmail,
  cocktailId,
  isFavourite: initialIsFavourite,
}: {
  userEmail: string;
  cocktailId: number;
  isFavourite: boolean;
}) {
  const [isFavourite, setIsFavourite] = useState(initialIsFavourite);
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await toggleFavourite(new FormData(e.target));

      setIsFavourite((prevIsFavourite) => !prevIsFavourite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="userEmail" value={userEmail} />
      <input type="hidden" name="cocktailId" value={cocktailId} />

      <button type="submit">
        <Image
          src={
            isFavourite
              ? '/../../images/components/heart2.svg'
              : '/../../images/components/heart1.svg'
          }
          width={24}
          height={24}
          alt={isFavourite ? 'remove from favourites' : 'add to favourites'}
        />
      </button>
    </form>
  );
}
