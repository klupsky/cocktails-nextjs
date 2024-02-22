import Cocktail from '../../../components/Cocktail/clientComponent';
import { getSingleCocktailFromCollection } from '../../../lib/data';

interface TParams {
  params: {
    cocktail: string;
  };
}

export default async function Page({ params }: TParams) {
  const { cocktail } = params;

  const collectionCocktail = await getSingleCocktailFromCollection(cocktail);

  return (
    <main>
      <Cocktail cocktail={collectionCocktail} />
    </main>
  );
}
