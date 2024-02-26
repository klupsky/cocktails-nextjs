import { auth } from '@/auth';
import AddToFavouritesForm from '../../../components/AddToFavouritesForm/clientComponent';
import Cocktail from '../../../components/Cocktail/clientComponent';
import FavouritesSum from '../../../components/FavouritesSum/clientComponent';
import ReviewForm from '../../../components/ReviewForm/clientComponent';
import {
  checkIsUserFavourite,
  checkUserReview,
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
    const isFavourite = await checkIsUserFavourite(
      userEmail,
      collectionCocktail.id,
    );

    const userReviewData = await checkUserReview(
      userEmail,
      collectionCocktail.id,
    );

    const { rating } = userReviewData ?? {};
    const { review } = userReviewData ?? {};

    return (
      <main>
        <Cocktail cocktail={collectionCocktail} />
        <AddToFavouritesForm
          isFavourite={isFavourite}
          userEmail={user.email || ''}
          cocktailId={collectionCocktail.id}
        />
        <ReviewForm
          userEmail={user.email || ''}
          userName={user.name || ''}
          cocktailId={collectionCocktail.id}
          userRating={rating}
          userReview={review}
        />
      </main>
    );
  }
}
