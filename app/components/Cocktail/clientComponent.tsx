'use client';
import Image from 'next/image';
import { TCocktail, TUser } from '../../lib/definitions';

type TCocktails = {
  cocktail: TCocktail;
  user: TUser;
};

export default function Cocktail({ cocktail, user }: TCocktails) {
  return (
    <section>
      {cocktail.name}

      {user && (
        <Image
          src="/../../images/components/heart1.svg"
          width={24}
          height={24}
          alt="add to favourites"
        />
      )}
    </section>
  );
}
