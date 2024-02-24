const { db } = require('@vercel/postgres');
const { cocktails } = require('../app/lib/cocktails.js');
const { flavours } = require('../app/lib/flavours.js');
const { levels } = require('../app/lib/levels.js');
const { spirits } = require('../app/lib/spirits.js');
const { categories } = require('../app/lib/categories.js');

const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Drop the "cocktails" table if it exists
    await client.sql`DROP TABLE IF EXISTS users`;
    console.log(`Dropped "users" table`);

    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedCocktails(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Drop the "cocktails" table if it exists
    await client.sql`DROP TABLE IF EXISTS cocktails`;

    console.log(`Dropped "cocktails" table`);

    // Create the "cocktails" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS cocktails (
        id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
        name varchar(50) NOT NULL,
			  level_id integer NOT NULL,
			  flavour_id integer NOT NULL,
			  spirit_id integer NOT NULL,
			  description varchar(500) NOT NULL,
			  glass varchar(50) NOT NULL,
			  method varchar(50) NOT NULL,
			  garnish varchar(50) NOT NULL,
			  category_id integer NOT NULL,
        slug varchar(30) NOT NULL
      );
    `;

    console.log(`Created "cocktails" table`);

    // Insert data into the "cocktails" table
    const insertedCocktails = await Promise.all(
      cocktails.map(
        (cocktail) => client.sql`
          INSERT INTO cocktails (id, name, level_id, flavour_id, spirit_id, description, glass, method, garnish, category_id, slug )
          VALUES (${cocktail.id}, ${cocktail.name}, ${cocktail.level_id}, ${cocktail.flavour_id}, ${cocktail.spirit_id}, ${cocktail.description}, ${cocktail.glass}, ${cocktail.method}, ${cocktail.garnish}, ${cocktail.category_id}, ${cocktail.slug})
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );

    console.log(`Seeded ${insertedCocktails.length} cocktails`);

    return {
      createTable,
      cocktails: insertedCocktails,
    };
  } catch (error) {
    console.error('Error seeding cocktails:', error);
    throw error;
  }
}

async function seedFlavours(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Drop the "flavour" table if it exists
    await client.sql`DROP TABLE IF EXISTS flavours`;

    console.log(`Dropped "flavours" table`);

    // Create the "flavours" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS flavours (
        id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
        name varchar(20) NOT NULL,
        colour varchar NOT NULL
      );
    `;

    console.log(`Created "flavours" table`);

    // Insert data into the "flavours" table
    const insertedFlavours = await Promise.all(
      flavours.map(
        (flavour) => client.sql`
          INSERT INTO flavours (id, name, colour)
          VALUES (${flavour.id}, ${flavour.name}, ${flavour.colour})
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );

    console.log(`Seeded ${insertedFlavours.length} flavours`);

    return {
      createTable,
      flavours: insertedFlavours,
    };
  } catch (error) {
    console.error('Error seeding flavours:', error);
    throw error;
  }
}

async function seedLevels(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Drop the "levels" table if it exists
    await client.sql`DROP TABLE IF EXISTS levels`;

    console.log(`Dropped "levels" table`);

    // Create the "levels" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS levels (
        id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
			  level integer NOT NULL
      );
    `;

    console.log(`Created "levels" table`);

    // Insert data into the "levels" table
    const insertedLevels = await Promise.all(
      levels.map(
        (level) => client.sql`
          INSERT INTO levels (id, level)
          VALUES (${level.id}, ${level.level})
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );

    console.log(`Seeded ${insertedLevels.length} levels`);

    return {
      createTable,
      levels: insertedLevels,
    };
  } catch (error) {
    console.error('Error seeding levels:', error);
    throw error;
  }
}

async function seedSpirits(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Drop the "spirits" table if it exists
    await client.sql`DROP TABLE IF EXISTS spirits`;

    console.log(`Dropped "spirits" table`);

    // Create the "spirits" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS spirits (
        id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
        name varchar(20) NOT NULL
      );
    `;

    console.log(`Created "spirits" table`);

    // Insert data into the "spirits" table
    const insertedSpirits = await Promise.all(
      spirits.map(
        (spirit) => client.sql`
          INSERT INTO spirits (id, name)
          VALUES (${spirit.id}, ${spirit.name})
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );

    console.log(`Seeded ${insertedSpirits.length} spirits`);

    return {
      createTable,
      spirits: insertedSpirits,
    };
  } catch (error) {
    console.error('Error seeding spirits:', error);
    throw error;
  }
}

async function seedCategories(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Drop the "categories" table if it exists
    await client.sql`DROP TABLE IF EXISTS categories`;

    console.log(`Dropped "categories" table`);

    // Create the "categories" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS categories (
        id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
        name varchar(20) NOT NULL
      );
    `;

    console.log(`Created "categories" table`);

    // Insert data into the "categories" table
    const insertedCategories = await Promise.all(
      categories.map(
        (category) => client.sql`
          INSERT INTO categories (id, name)
          VALUES (${category.id}, ${category.name})
          ON CONFLICT (id) DO NOTHING;
        `,
      ),
    );

    console.log(`Seeded ${insertedCategories.length} categories`);

    return {
      createTable,
      categories: insertedCategories,
    };
  } catch (error) {
    console.error('Error seeding categories:', error);
    throw error;
  }
}

async function seedFavourites(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Drop the "favourites" table if it exists
    await client.sql`DROP TABLE IF EXISTS favourites`;
    console.log(`Dropped "users" table`);

    // Create the "favourites" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS favourites (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_email TEXT NOT NULL,
        cocktail_id integer NOT NULL
      );
    `;

    console.log(`Created "favourites" table`);

    // Insert data into the "favourites" table
    const insertedFavourites = await Promise.all(
      favourites.map(
        (favourite) => client.sql`
        INSERT INTO favourites (user_email, cocktail_id)
        VALUES (${favourite.user_email}, ${favourite.cocktail_id})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedFavourites.length} favourites`);

    return {
      createTable,
      favourites: insertedFavourites,
    };
  } catch (error) {
    console.error('Error seeding favourites:', error);
    throw error;
  }
}

async function seedReviews(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Drop the "reviews" table if it exists
    await client.sql`DROP TABLE IF EXISTS reviews`;
    console.log(`Dropped "reviews" table`);

    // Create the "reviews" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS reviews (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_email TEXT NOT NULL,
        user_name varchar(50) NOT NULL,
			  review varchar(500) NOT NULL,
			  rating integer NOT NULL,
        cocktail_id integer NOT NULL
      );
    `;

    console.log(`Created "reviews" table`);

    // Insert data into the "reviews" table
    const insertedReviews = await Promise.all(
      reviews.map(
        (review) => client.sql`
        INSERT INTO reviews (user_email, user_name, review, rating, cocktail_id)
        VALUES (${review.user_email}, ${review.user_name}, ${review.review}, ${review.rating}, ${review.cocktail_id})
        ON CONFLICT (id) DO NOTHING;
      `,
      ),
    );

    console.log(`Seeded ${insertedReviews.length} reviews`);

    return {
      createTable,
      reviews: insertedReviews,
    };
  } catch (error) {
    console.error('Error seeding reviews:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  // await seedCocktails(client);
  // await seedFlavours(client);
  // await seedLevels(client);
  // await seedSpirits(client);
  // await seedCategories(client);

  await seedReviews(client);
  // await seedUsers(client);
  // await seedFavourites(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
