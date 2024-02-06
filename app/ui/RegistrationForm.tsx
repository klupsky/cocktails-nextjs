'use client';
import { createUser } from '@/app/lib/actions';
import { useFormState } from 'react-dom';

export default function RegistrationForm() {
  const initialState = { message: null, errors: {} };

  const [state, dispatch] = useFormState(createUser, initialState);

  return (
    <form action={dispatch}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          aria-describedby="name-error"
        />
        <div id="name-error" aria-live="polite" aria-atomic="true">
          {state.errors?.name &&
            state.errors.name.map((error: string) => (
              <p className="text-red" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          aria-describedby="email-error"
        />
        <div id="email-error" aria-live="polite" aria-atomic="true">
          {state.errors?.email &&
            state.errors.email.map((error: string) => (
              <p className="text-red" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          aria-describedby="password-error"
        />
        <div id="password-error" aria-live="polite" aria-atomic="true">
          {state.errors?.password &&
            state.errors.password.map((error: string) => (
              <p className="text-red" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>

      <button type="submit">Register</button>
    </form>
  );
}
