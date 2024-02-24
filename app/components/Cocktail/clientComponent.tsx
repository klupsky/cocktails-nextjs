'use client';
import { TCocktail, TUser } from '../../lib/definitions';
import AddToFavouritesForm from '../AddToFavouritesForm/clientComponent';
import ReviewForm from '../ReviewForm/clientComponent';

type TCocktails = {
  cocktail: TCocktail;
  user: TUser;
};

export default function Cocktail({ cocktail, user }: TCocktails) {
  console.log(user, cocktail);
  return (
    <section>
      {cocktail.name}
      {cocktail.cocktail_id}
      {user && (
        <AddToFavouritesForm
          userEmail={user.email}
          cocktailId={cocktail.cocktail_id}
        />
      )}
      {user && (
        <ReviewForm
          userEmail={user.email}
          userName={user.name}
          cocktailId={cocktail.cocktail_id}
        />
      )}
    </section>
  );
}
