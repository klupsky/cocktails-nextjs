import { TCocktail, TUserFromParams } from '../../lib/definitions';
import AddToFavouritesForm from '../AddToFavouritesForm/clientComponent';
import ReviewForm from '../ReviewForm/clientComponent';

type TCocktails = {
  cocktail: TCocktail;
  user?: TUserFromParams;
  isFavourite: boolean;
};

export default function Cocktail({ cocktail, user, isFavourite }: TCocktails) {
  return (
    <section>
      {cocktail.name}
      {cocktail.cocktail_id}
      {user && (
        <AddToFavouritesForm
          isFavourite={isFavourite}
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
