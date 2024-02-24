'use server';
import { signIn } from '@/auth';
import { sql } from '@vercel/postgres';
import { AuthError } from 'next-auth';
import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

const bcrypt = require('bcrypt');

// REGISTER

//  form validation
const RegisterFormSchema = z.object({
  id: z.string(),
  name: z.string().refine((data) => data.length > 0, {
    message: 'Please add a Name.',
  }),
  email: z.string().email({
    message: 'Please enter a valid Email Address.',
  }),
  password: z.string().refine((data) => data.length > 6, {
    message: 'Please enter a Password.',
  }),
});

const CreateUser = RegisterFormSchema.omit({ id: true, date: true });

export type TState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string | null;
};

export async function createUser(prevState: TState, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateUser.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to register a new User.',
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const id = uuidv4();

  try {
    await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${id}, ${name}, ${email}, ${hashedPassword})
      ON CONFLICT (id) DO NOTHING;
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/login');
  redirect('/login');
}

// AUTHENTICATION

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }

  redirect('/dashboard');
}

// RECOMMENDATION

//  form validation
const RecommendationFormSchema = z.object({
  flavour: z
    .string()
    .nullable()
    .refine(
      (data) => data !== null && data !== undefined && data.trim() !== '',
      {
        message: 'Please pick a flavour.',
      },
    ),
  spirit: z
    .string()
    .nullable()
    .refine(
      (data) => data !== null && data !== undefined && data.trim() !== '',
      {
        message: 'Please pick a spirit.',
      },
    ),
  level: z
    .string()
    .nullable()
    .refine(
      (data) => data !== null && data !== undefined && data.trim() !== '',
      {
        message: 'Please pick a level.',
      },
    ),
});

export type TRecommendation = {
  errors?: {
    flavour?: string[];
    spirit?: string[];
    level?: string[];
  };
  message?: string | null;
};

export async function createRecommendation(
  prevState: TRecommendation,
  formData: FormData,
) {
  // Validate form using Zod
  const validatedFields = RecommendationFormSchema.safeParse({
    flavour: formData.get('flavour'),
    spirit: formData.get('spirit'),
    level: formData.get('level'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to recommend you a cocktail.',
    };
  }

  // Prepare recommendation link
  const { flavour, spirit, level } = validatedFields.data;

  const recommendationLink = `/recommendation/flavour=${flavour}&spirit=${spirit}&level=${level}`;
  revalidatePath(recommendationLink);
  redirect(recommendationLink);
}

// ADD TO FAVOURITES

export async function addToFavourites(formData: FormData) {
  const userEmail = formData.get('userEmail');
  const cocktailId = formData.get('cocktailId');
  // Check if the values are present and convert them to strings
  const userEmailValue = userEmail ? userEmail.toString() : null;
  const cocktailIdValue = cocktailId ? cocktailId.toString() : null;
  noStore();
  try {
    // Check if the combination already exists
    const existingFavourite = await sql`
      SELECT id
      FROM favourites
      WHERE user_email = ${userEmailValue} AND cocktail_id = ${cocktailIdValue}
    `;

    if (existingFavourite.rows.length > 0) {
      // If the combination exists, delete the existing row
      await sql`
        DELETE FROM favourites
        WHERE user_email = ${userEmailValue} AND cocktail_id = ${cocktailIdValue}
      `;
      console.log('removed', userEmailValue, cocktailIdValue);
    } else {
      // If the combination doesn't exist, insert a new row
      await sql`
        INSERT INTO favourites (user_email, cocktail_id)
        VALUES (${userEmailValue}, ${cocktailIdValue})
      `;
      console.log('added', userEmailValue, cocktailIdValue);
    }
  } catch (error) {
    console.error('Database error:', error);
    return {
      message: 'Database Error: Failed to add or remove from favourites.',
    };
  }
}

// REMOVE FROM FAVOURITES

export async function removeFromFavourites(formData: FormData) {
  const userEmail = String(formData.get('userEmail'));
  const cocktailId = String(formData.get('cocktailId'));

  try {
    await sql`
      DELETE FROM favourites
      WHERE user_email = ${userEmail} AND cocktail_id = ${cocktailId}
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to remove from favourites.',
    };
  }
}

// CHECK IF FAVOURITE

export async function checkFavourites(formData: FormData) {
  const userEmail = formData.get('userEmail');
  const cocktailId = formData.get('cocktailId');

  // Check if the values are present and convert them to strings
  const userEmailValue = userEmail ? userEmail.toString() : null;
  const cocktailIdValue = cocktailId ? cocktailId.toString() : null;

  try {
    await sql`
    SELECT
      favourites.id

    FROM
      favourites

    WHERE
      favourites.user_email = ${userEmailValue} AND
      favourites.cocktail_id = ${cocktailIdValue}

  `;
    return favouritesCheck.rows.length > 0;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to fetch favourites.',
      error: error.message, // You might want to include the actual error message for debugging.
    };
  }
}
