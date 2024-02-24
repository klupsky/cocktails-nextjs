import { TCocktail, TUserFromParams } from '../../lib/definitions';
import AddToFavouritesForm from '../AddToFavouritesForm/clientComponent';
import ReviewForm from '../ReviewForm/clientComponent';

type TCocktails = {
  cocktail: TCocktail;
};

export default function Cocktail({ cocktail }: TCocktails) {
  return (
    <section>
      {cocktail.name}
      {cocktail.cocktail_id}
    </section>
  );
}
