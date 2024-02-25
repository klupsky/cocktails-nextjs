import { auth } from '@/auth';
import Cocktail from '../../../components/Cocktail/clientComponent';
import FavouritesSum from '../../../components/FavouritesSum/clientComponent';
import ReviewForm from '../../../components/ReviewForm/clientComponent';
import {
  checkUserRating,
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
  const session = await auth();

  const user = session?.user;

  const collectionCocktail = await getSingleCocktailFromCollection(cocktail);
  const favouritesSum = await getFavouritesSumOfCocktail(collectionCocktail.id);

  if (!user) {
    return (
      <main>
        <Cocktail cocktail={collectionCocktail} />
        <FavouritesSum favouritesSum={favouritesSum} />
      </main>
    );
  } else {
    const userEmail = user?.email || '';

    const userRating = await checkUserRating(userEmail, collectionCocktail.id);

    return (
      <main>
        <Cocktail cocktail={collectionCocktail} />
        <FavouritesSum favouritesSum={favouritesSum} />

        <ReviewForm
          userEmail={user.email || ''}
          userName={user.name || ''}
          cocktailId={collectionCocktail.id}
          userRating={userRating}
        />
      </main>
    );
  }
}
