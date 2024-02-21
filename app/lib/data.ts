import { sql } from '@vercel/postgres';
import {
  TCategory,
  TFlavour,
  TLevel,
  TPreviewCocktail,
  TSpirit,
  TUser,
} from './definitions';

// GET USER BY EMAIL

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as TUser;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

// GET COCKTAIL PREVIEW

export async function getPreviewFromCollectionOfCocktails() {
  try {
    const previewCollection = await sql<TPreviewCocktail[]>`
      SELECT
        cocktails.id AS id,
        cocktails.name AS name,
        levels.id AS levelId,
        flavours.id AS flavourId,
        spirits.id AS spiritId,
        categories.id AS categoryId
      FROM
        cocktails
        JOIN flavours ON cocktails.flavour_id = flavours.id
        JOIN levels ON cocktails.level_id = levels.id
        JOIN spirits ON cocktails.spirit_id = spirits.id
        JOIN categories ON cocktails.category_id = categories.id
      ORDER BY
        name ASC
      LIMIT 6;
    `;
    return previewCollection;
  } catch (error) {
    console.error('Failed to fetch preview cocktails:', error);
    throw new Error('Failed to fetch preview cocktails.');
  }
}

// GET CATEGORIES

export async function getCategories() {
  try {
    const categories = await sql<TCategory[]>`
    SELECT
      *
    FROM
      categories
    ORDER BY name ASC;
    `;
    return categories;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw new Error('Failed to fetch categories.');
  }
}

// GET FLAVOURS

export async function getFlavours() {
  try {
    const flavours = await sql<TFlavour[]>`
    SELECT
      *
    FROM
      flavours
    ORDER BY name ASC;
    `;
    return flavours;
  } catch (error) {
    console.error('Failed to fetch flavours:', error);
    throw new Error('Failed to fetch flavours.');
  }
}

// GET LEVELS

export async function getLevels() {
  try {
    const levels = await sql<TLevel[]>`
    SELECT
      *
    FROM
      levels
    `;
    return levels;
  } catch (error) {
    console.error('Failed to fetch levels::', error);
    throw new Error('Failed to fetch levels.');
  }
}

// GET SPIRITS

export async function getSpirits() {
  try {
    const spirits = await sql<TSpirit[]>`
    SELECT
      *
    FROM
      spirits
    ORDER BY name ASC;
    `;
    return spirits;
  } catch (error) {
    console.error('Failed to fetch spirits:', error);
    throw new Error('Failed to fetch spirits.');
  }
}
