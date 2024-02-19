import { sql } from '@vercel/postgres';
import { PreviewCocktail, User } from './definitions';

// GET USER BY EMAIL

export async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

// GET USER BY ID

export async function getUserById(id: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE id=${id}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

// GET COCKTAILS
export async function getPreviewFromCollectionOfCocktails() {
  try {
    const previewCollection = await sql<PreviewCocktail[]>`
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
    console.log(previewCollection, 'this is the previewCollection');
    return previewCollection;
  } catch (error) {
    console.error('Failed to fetch preview cocktails:', error);
    throw new Error('Failed to fetch preview cocktails.');
  }
}
