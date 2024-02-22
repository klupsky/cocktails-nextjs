'use client';
import { TCocktail } from '../../lib/definitions';

type TCocktails = {
  cocktail: TCocktail;
};

export default function Cocktail({ cocktail }: TCocktails) {
  return <section>{cocktail.name}</section>;
}
