import { getSingleCocktailFromCollection } from '../../../lib/data';

interface TParams {
  params: {
    cocktail: string;
  };
}

export default async function Page({ params }: TParams) {
  const { cocktail } = params;

  const collectionCocktail = await getSingleCocktailFromCollection(cocktail);

  console.log(collectionCocktail);
  return <main>{collectionCocktail.name}</main>;
}
