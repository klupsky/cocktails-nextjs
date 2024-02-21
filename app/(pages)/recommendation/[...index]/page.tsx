import Recommendation from '../../../components/Recommendation/clientComponent';
import { getRecommendationBasedOnUrlAndDatabase } from '../../../lib/data';

interface TParams {
  params: {
    index: string[];
  };
}

export default async function Page({ params }: TParams) {
  const encodedParams = params.index[0];
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
  console.log(recommedation);
  return (
    <main>
      <Recommendation />
    </main>
  );
}
