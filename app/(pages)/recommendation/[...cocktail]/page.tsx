import { auth } from '@/auth';
import Cocktail from '../../../components/Cocktail/clientComponent';
import {
  checkIsUserFavourite,
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

  let isFavourite = false;
  if (user && recommedation) {
    isFavourite = await checkIsUserFavourite(
      user.email,
      recommedation.cocktail_id,
    );
  }

  return (
    <main>
      {user && <>hello {user.name}</>}
      <Cocktail
        cocktail={recommedation}
        user={user}
        isFavourite={isFavourite}
      />
    </main>
  );
}
