import FavouritesSum from '@/app/components/FavouritesSum/clientComponent';
import { auth } from '@/auth';
import AddToFavouritesForm from '../../../components/AddToFavouritesForm/clientComponent';
import Cocktail from '../../../components/Cocktail/clientComponent';
import ReviewForm from '../../../components/ReviewForm/clientComponent';
import {
  checkIsUserFavourite,
  checkUserRating,
  getFavouritesSumOfCocktail,
  getRecommendationBasedOnUrlAndDatabase,
} from '../../../lib/data';

interface TParams {
  params: {
    cocktail: string[];
  };
}

export default async function Page({ params }: TParams) {
  const session = await auth();

  const user = session?.user;

  const encodedParams = params.cocktail[0];
  const decodedParams = encodedParams.replace(/%3D/g, '=').replace(/%26/g, '&');
  const paramsArray = decodedParams.split('&');
  const [flavour, spirit, level] = paramsArray.map(
    (param: string) => param.split('=')[1],
  );

  const recommedation = await getRecommendationBasedOnUrlAndDatabase(
    flavour,
    spirit,
    level,
  );

  const favouritesSum = await getFavouritesSumOfCocktail(
    recommedation.cocktail_id,
  );

  if (!user) {
    return (
      <main>
        <Cocktail cocktail={recommedation} />
        <FavouritesSum favouritesSum={favouritesSum} />
      </main>
    );
  } else {
    const userEmail = user?.email || '';

    const isFavourite = await checkIsUserFavourite(
      userEmail,
      recommedation.cocktail_id,
    );

    const userRating = await checkUserRating(
      userEmail,
      recommedation.cocktail_id,
    );
    return (
      <main>
        <>hello {user.name}</>
        <Cocktail cocktail={recommedation} />
        <AddToFavouritesForm
          isFavourite={isFavourite}
          userEmail={user.email || ''}
          cocktailId={recommedation.cocktail_id}
        />
        <ReviewForm
          userEmail={user.email || ''}
          userName={user.name || ''}
          cocktailId={recommedation.cocktail_id}
          userRating={userRating}
        />
      </main>
    );
  }
}
