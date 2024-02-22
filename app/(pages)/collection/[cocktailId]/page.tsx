import { getSingleCocktailFromCollection } from '../../../lib/data';

interface TParams {
  params: {
    cocktailId: string;
  };
}

export default async function Page({ params }: TParams) {
  const { cocktailId } = params;

  const cocktail = await getSingleCocktailFromCollection(cocktailId);
  return <main>{cocktail.name}</main>;
}
