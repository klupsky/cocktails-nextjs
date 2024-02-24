'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toggleFavourite } from '../../lib/actions';

export default function AddToFavouritesForm({
  userEmail,
  cocktailId,
}: {
  userEmail: string;
  cocktailId: number;
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Fetch information about whether the cocktail is already a favorite
    const fetchFavoriteStatus = async () => {
      try {
        const response = await fetch(
          `/api/check-favourite?userEmail=${encodeURIComponent(
            userEmail,
          )}&cocktailId=${encodeURIComponent(cocktailId)}`,
        );

        if (response.ok) {
          const data = await response.json();
          setIsFavorite(data.isFavorite);
        } else {
          console.error('Failed to fetch favorite status');
        }
      } catch (error) {
        console.error('Error fetching favorite status:', error);
      }
    };

    fetchFavoriteStatus();
  }, [userEmail, cocktailId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await toggleFavourite(new FormData(e.target));

      // After toggling, update the favorite status
      setIsFavorite((prevIsFavorite) => !prevIsFavorite);
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
