'use client';

import { TCategory, TCocktail } from '../../lib/definitions';

type TCollection = {
  collection: TCocktail[];
  categories: TCategory[];
};
export default function Collection({ collection, categories }: TCollection) {
  console.log(collection, categories);
  return <section>cocktails</section>;
}
