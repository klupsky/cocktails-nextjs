import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import {
  TCategory,
  TCocktail,
  TCollection,
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

// GET ALL COCKTAILS

export async function getFullCollectionOfCocktails() {
  try {
    const collection = await sql<TCollection>`

    SELECT
      cocktails.id AS id,
      cocktails.name AS name,
      levels.level AS level,
      levels.id AS levelId,
      flavours.id AS flavourId,
      flavours.name AS flavour,
      spirits.name AS spirit,
      spirits.id AS spiritId,
      cocktails.description AS description,
      cocktails.glass AS glass,
      cocktails.method AS method,
      cocktails.garnish AS garnish,
      categories.name AS category,
      categories.id AS categoryId,
      cocktails.slug AS slug

    FROM
      cocktails,
      flavours,
      levels,
      spirits,
      categories

     WHERE
      cocktails.spirit_id = spirits.id AND
      cocktails.flavour_id = flavours.id AND
      cocktails.level_id = levels.id AND
      cocktails.category_id = categories.id

    ORDER BY name ASC;

  `;
    return collection.rows;
  } catch (error) {
    console.error('Failed to fetch collection:', error);
    throw new Error('Failed to fetch collection.');
  }
}

// GET COCKTAIL PREVIEW

export async function getPreviewFromCollectionOfCocktails() {
  try {
    const previewCollection = await sql<TPreviewCocktail>`
      SELECT
        cocktails.id AS id,
        cocktails.name AS name,
        cocktails.slug AS slug,
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
    return previewCollection.rows;
  } catch (error) {
    console.error('Failed to fetch preview cocktails:', error);
    throw new Error('Failed to fetch preview cocktails.');
  }
}

// GET CATEGORIES

export async function getCategories() {
  try {
    const categories = await sql<TCategory>`
    SELECT
      *
    FROM
      categories
    ORDER BY name ASC;
    `;
    return categories.rows;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw new Error('Failed to fetch categories.');
  }
}

// GET FLAVOURS

export async function getFlavours() {
  try {
    const flavours = await sql<TFlavour>`
    SELECT
      *
    FROM
      flavours
    ORDER BY name ASC;
    `;
    return flavours.rows;
  } catch (error) {
    console.error('Failed to fetch flavours:', error);
    throw new Error('Failed to fetch flavours.');
  }
}

// GET LEVELS

export async function getLevels() {
  try {
    const levels = await sql<TLevel>`
    SELECT
      *
    FROM
      levels
    `;
    return levels.rows;
  } catch (error) {
    console.error('Failed to fetch levels:', error);
    throw new Error('Failed to fetch levels.');
  }
}

// GET SPIRITS

export async function getSpirits() {
  try {
    const spirits = await sql<TSpirit>`
    SELECT
      *
    FROM
      spirits
    ORDER BY name ASC;
    `;
    return spirits.rows;
  } catch (error) {
    console.error('Failed to fetch spirits:', error);
    throw new Error('Failed to fetch spirits.');
  }
}

// GET COCKTAIL RECOMMENDATION

export async function getRecommendationBasedOnUrlAndDatabase(
  flavour: number | string,
  spirit: number | string,
  level: number | string,
) {
  try {
    const joinedRecommendation = await sql<TCocktail>`
    SELECT
      cocktails.id AS cocktail_id,
      cocktails.name AS name,
      cocktails.slug AS slug,
      levels.level AS level,
      levels.id AS levelId,
      flavours.id AS flavourId,
      flavours.name AS flavour,
      flavours.colour AS flavourcolour,
      spirits.name AS spirit,
      spirits.id AS spiritId,
      cocktails.description AS description,
      cocktails.glass AS glass,
      cocktails.method AS method,
      cocktails.garnish AS garnish,
      categories.name AS category,
      categories.id AS categoryId

    FROM
      cocktails,
      flavours,
      levels,
      spirits,
      categories

    WHERE
      cocktails.flavour_id = ${flavour} AND
      flavours.id = ${flavour} AND
      cocktails.spirit_id = ${spirit} AND
      spirits.id = ${spirit} AND
      cocktails.level_id = ${level} AND
      levels.id = ${level} AND
      cocktails.category_id = categories.id

    ORDER BY RANDOM()
    LIMIT 1
  `;

    if (joinedRecommendation.rows.length > 0) {
      return joinedRecommendation.rows[0];
    }

    const joinedRecommendationBackup = await sql<TCocktail>`
      SELECT
        cocktails.id AS cocktail_id,
        cocktails.name AS name,
        cocktails.slug AS slug,
        levels.level AS level,
        levels.id AS levelId,
        flavours.id AS flavourId,
        flavours.name AS flavour,
        flavours.colour AS flavourcolour,
        spirits.name AS spirit,
        spirits.id AS spiritId,
        cocktails.description AS description,
        cocktails.glass AS glass,
        cocktails.method AS method,
        cocktails.garnish AS garnish,
        categories.name AS category,
        categories.id AS categoryId
      FROM
        cocktails,
        flavours,
        levels,
        spirits,
        categories
      WHERE
        spirits.id = ${spirit} AND
        cocktails.spirit_id = ${spirit} AND
        cocktails.level_id = levels.id AND
        cocktails.flavour_id = flavours.id AND
        cocktails.category_id = categories.id
      ORDER BY RANDOM()
      LIMIT 1
    `;

    return joinedRecommendationBackup.rows[0];
  } catch (error) {
    console.error('Failed to fetch a recommendation:', error);
    throw new Error('Failed to fetch recommendation.');
  }
}

// GET SINGLE COCKTAIL FROM COLLECTION

export async function getSingleCocktailFromCollection(cocktail: string) {
  try {
    const collectionCocktail = await sql<TCocktail>`
    SELECT
      cocktails.id,
      cocktails.name,
      cocktails.slug,
      cocktails.level_id,
      cocktails.description,
      cocktails.glass,
      cocktails.method,
      cocktails.garnish,
      flavours.colour AS flavourcolour,
      flavours.name AS flavourname,
      spirits.name AS spirit,
      categories.name AS category

    FROM
      cocktails,
      flavours,
      levels,
      spirits,
      categories

    WHERE
      cocktails.slug = ${cocktail} AND
      cocktails.flavour_id = flavours.id AND
      cocktails.level_id = levels.id AND
      cocktails.spirit_id = spirits.id AND
      cocktails.category_id = categories.id
      `;
    return collectionCocktail.rows[0];
  } catch (error) {
    console.error('Failed to fetch cocktail:', error);
    throw new Error('Failed to fetch cocktail.');
  }
}

// CHECK IF COCKTAIL IS A USERS FAVOURITE

export async function checkIsUserFavourite(
  userEmail: string,
  cocktailId: number,
) {
  noStore();
  try {
    const existingFavourite = await sql`
      SELECT id
      FROM favourites
      WHERE user_email = ${userEmail} AND cocktail_id = ${cocktailId}
    `;

    return existingFavourite.rows.length > 0;
  } catch (error) {
    console.error('Failed to fetch favourite:', error);
    throw new Error('Failed to fetch favourite.');
  }
}

// GET SUM OF FAVOURITES

export async function getFavouritesSumOfCocktail(cocktailId: number) {
  noStore();
  try {
    const favourites = await sql`
      SELECT id
      FROM favourites
      WHERE cocktail_id = ${cocktailId} AND
      favourites.cocktail_id = ${cocktailId}
    `;

    return favourites.rows.length;
  } catch (error) {
    console.error('Failed to fetch favourite:', error);
    throw new Error('Failed to fetch favourite.');
  }
}

// CHECK USER RATING

export async function checkUserReview(userEmail: string, cocktailId: number) {
  noStore();

  try {
    const result = await sql`
      SELECT * FROM reviews
      WHERE user_email = ${userEmail}
      AND cocktail_id = ${cocktailId}
    `;

    return result.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    return null; // Handle database error
  }
}

// GET ALL REVIEWS OF A COCKTAIL

export async function getCocktailReviews(cocktailId: number) {
  noStore();
  try {
    const cocktailReviews = await sql`
    SELECT
      *
    FROM
      reviews
    WHERE
      cocktail_id = ${cocktailId}
  `;
    return cocktailReviews.rows;
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    throw new Error('Failed to fetch reviews.');
  }
}

// GET USER FAVOURITES

export async function getUserFavourites(userEmail: string) {
  noStore();
  try {
    const favouriteCocktails = await sql`
    SELECT
      *,
      cocktails.name as cocktailName

    FROM
      favourites,
      cocktails,
      users,
      flavours,
      reviews

    WHERE
      favourites.user_email = ${userEmail} AND
      favourites.cocktail_id = cocktails.id AND
      cocktails.flavour_id = flavours.id AND
      reviews.cocktail_id = cocktails.id
  `;
    return favouriteCocktails.rows;
  } catch (error) {
    console.error('Failed to fetch favourite:', error);
    throw new Error('Failed to fetch favourite.');
  }
}

// GET RATINGS OF COCKTAIL

export async function getCocktailRating(cocktailId: number) {
  noStore();
  try {
    const cocktailRating = await sql`
    SELECT
      reviews.rating,
      reviews.id

    FROM
      cocktails,
      reviews

    WHERE
      cocktails.id = ${cocktailId} AND
      reviews.cocktail_id = ${cocktailId}
      `;

    const ratingsArray = cocktailRating.rows.map((row) => row.rating);

    const averageRating = ratingsArray.length
      ? Math.ceil(
          ratingsArray.reduce((total, rating) => total + rating, 0) /
            ratingsArray.length,
        )
      : 0;

    return { ratings: cocktailRating.rows, averageRating };
  } catch (error) {
    console.error('Failed to fetch favourite:', error);
    throw new Error('Failed to fetch favourite.');
  }
}
