import Cocktail from '../../../components/Cocktail/clientComponent';
import FavouritesSum from '../../../components/FavouritesSum/clientComponent';
import {
  getFavouritesSumOfCocktail,
  getSingleCocktailFromCollection,
} from '../../../lib/data';

interface TParams {
  params: {
    cocktail: string;
  };
}

export default async function Page({ params }: TParams) {
  const { cocktail } = params;

  const collectionCocktail = await getSingleCocktailFromCollection(cocktail);
  console.log(collectionCocktail, 'collectionCocktail');
  const favouritesSum = await getFavouritesSumOfCocktail(collectionCocktail.id);

  return (
    <main>
      <Cocktail cocktail={collectionCocktail} />
      <FavouritesSum favouritesSum={favouritesSum} />
    </main>
  );
}
