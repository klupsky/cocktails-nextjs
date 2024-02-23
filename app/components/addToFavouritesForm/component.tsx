'use client';

import Image from 'next/image';
import { useFormState } from 'react-dom';
import { addToFavourites } from '../../lib/actions';

export default function AddToFavouritesForm({
  userEmail,
  cocktailId,
}: {
  userEmail: string;
  cocktailId: number;
}) {
  return (
    <form action={addToFavourites}>
      <input type="hidden" id="userEmail" name="userEmail" value={userEmail} />
      <input
        type="hidden"
        id="cocktailId"
        name="cocktailId"
        value={cocktailId}
      />

      <button type="submit">
        <Image
          src="/../../images/components/heart1.svg"
          width={24}
          height={24}
          alt="add to favourites"
        />
      </button>
    </form>
  );
}
