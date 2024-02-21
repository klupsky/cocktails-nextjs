'use server';
import { signIn } from '@/auth';
import { sql } from '@vercel/postgres';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
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

  // Prepare data for insertion into the database
  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const id = uuidv4();

  // Insert data into the database
  try {
    await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (${id}, ${name}, ${email}, ${hashedPassword})
      ON CONFLICT (id) DO NOTHING;
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
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
