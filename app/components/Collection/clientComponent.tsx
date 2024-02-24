'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TCategory, TCollection } from '../../lib/definitions';

export default function Collection({
  collection,
  categories,
}: {
  collection: TCollection[];
  categories: TCategory[];
}) {
  const [activeCategory, setActiveCategory] = useState<string>('');
  const [cocktailList, setCocktailList] = useState(collection);

  const filterCocktails = (category: any) => {
    setCocktailList(
      collection.filter((cocktail) => cocktail.category === category),
    );
  };

  return (
    <section>
      cocktails
      <div>
        {categories.map((category) => {
          return (
            <button
              key={category.name}
              onClick={() => {
                filterCocktails(category.name);
              }}
            >
              {category.name}
            </button>
          );
        })}
        <button
          onClick={() => {
            setCocktailList(collection);
          }}
        >
          FULL COLLECTION
        </button>
      </div>
      <div>
        {cocktailList.map((cocktailName) => {
          return (
            <div key={`cocktailName-${cocktailName.id}`}>
              <div>{cocktailName.name}</div>
              <div>
                <span> {cocktailName.category}</span>
              </div>
              <div>
                <Link href={`/collection/${cocktailName.slug}`}>
                  <Image
                    src="/../images/components/→.svg"
                    width={30}
                    height={30}
                    alt="arrow"
                  />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
