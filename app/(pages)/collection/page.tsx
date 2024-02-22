import Collection from '../../components/Collection/clientComponent';
import { getCategories, getFullCollectionOfCocktails } from '../../lib/data';

export default async function Page() {
  const collection = await getFullCollectionOfCocktails();
  const categories = await getCategories();

  return (
    <main>
      <Collection categories={categories} collection={collection} />
    </main>
  );
}
