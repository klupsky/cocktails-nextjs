import { getCategories, getFullCollectionOfCocktails } from '../../lib/data';

export default async function Page() {
  const collection = await getFullCollectionOfCocktails();
  const categories = await getCategories();

  console.log(collection, categories, 'hello');
  return (
    <>{/* <Collection categories={categories} collection={collection} /> */}</>
  );
}
