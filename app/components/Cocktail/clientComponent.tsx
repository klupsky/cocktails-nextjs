'use client';
import { TCocktail, TUser } from '../../lib/definitions';
import AddToFavouritesForm from '../addToFavouritesForm/component';

type TCocktails = {
  cocktail: TCocktail;
  user: TUser;
};

export default function Cocktail({ cocktail, user }: TCocktails) {
  console.log(user, cocktail);
  return (
    <section>
      {cocktail.name}

      {user && (
        <AddToFavouritesForm
          userEmail={user.email}
          cocktailId={cocktail.cocktail_id}
        />
      )}
    </section>
  );
}
