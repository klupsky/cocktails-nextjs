'use client';

import { authenticate } from '@/app/lib/actions';
import Link from 'next/link';
import { useFormState, useFormStatus } from 'react-dom';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch}>
      <div>
        <h1>Please log in to continue.</h1>
        <div>
          <div>
            <label htmlFor="email">Email</label>
            <div>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <div>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>
          </div>
        </div>
        <LoginButton />

        <div aria-live="polite" aria-atomic="true">
          {errorMessage && (
            <>
              <p>{errorMessage}</p>
            </>
          )}
        </div>
      </div>
      <div>
        Don't have an account? <Link href="/register">Register now</Link>
      </div>
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return <button>Log in</button>;
}
