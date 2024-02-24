'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { createReview } from '../../lib/actions';
import Star from './Star';

export default function ReviewForm({
  userEmail,
  cocktailId,
  userName,
}: {
  userEmail: string;
  cocktailId: number;
  userName: string;
}) {
  const grades = [0, 1, 2, 3, 4];

  const initialState = { message: null, errors: {}, rating: 0 };

  const [state, dispatch] = useFormState(createReview, initialState);

  console.log(state);

  return (
    <form action={dispatch}>
      <input type="hidden" name="userEmail" value={userEmail} />
      <input type="hidden" name="cocktailId" value={cocktailId} />
      <input type="hidden" name="userName" value={userName} />
      <label htmlFor="review">Review</label>
      <input id="review" name="review" />
      <div>
        {grades.map((grade, index) => (
          <label className="star" key={`star-${index + 1}`}>
            <input
              type="radio"
              id={`rating-${index}`}
              name="rating"
              value={index + 1}
            />
            <Star filled={index + 1 <= state.rating} />
          </label>
        ))}
      </div>
      {state.errors?.rating &&
        state.errors.rating.map((error: string) => (
          <p className="text-red" key={error}>
            {error}
          </p>
        ))}
      <button type="submit">Submit</button>
    </form>
  );
}
