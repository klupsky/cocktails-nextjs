'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { createReview } from '../../lib/actions';
import Star from './Star';

export default function ReviewForm({
  userEmail,
  cocktailId,
  userName,
  userRating: initialRating,
  userReview: initialReview,
}: {
  userEmail?: string;
  cocktailId: number;
  userName: string;
  userRating: number | null;
  userReview: string | null;
}) {
  const [rating, setRating] = useState(initialRating ?? 0);
  const [review, setReview] = useState(initialReview ?? '');

  console.log(initialReview, 'initialReview frontend');
  console.log(initialRating, 'initialRating frontend');

  console.log(review, 'review frontend');

  const grades = [0, 1, 2, 3, 4];

  const initialState = {
    message: null,
    errors: {},
    review: initialReview,
    rating: initialRating,
  };

  const [state, dispatch] = useFormState(createReview, initialState);

  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRating = parseInt(event.target.value, 10);
    setRating(newRating !== rating ? newRating : rating);
    console.log(newRating, 'newRating');
  };

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newReview = event.target.value;
    setReview(newReview !== review ? newReview : review);
    console.log(newReview, 'newReview');
  };

  return (
    <form action={dispatch}>
      <input type="hidden" name="userEmail" value={userEmail} />
      <input type="hidden" name="cocktailId" value={cocktailId} />
      <input type="hidden" name="userName" value={userName} />
      <label htmlFor="review">Review</label>
      {review && review} {initialReview && initialReview}
      <input
        id="review"
        name="review"
        // disabled={userReview ? true : false}
        value={review}
        onChange={handleReviewChange}
      />
      <div>
        {grades.map((grade, index) => (
          <label className="star" key={`star-${index + 1}`}>
            <input
              type="radio"
              id={`rating-${index}`}
              name="rating"
              value={rating ? rating : index + 1}
              onChange={handleRatingChange}
            />
            <Star filled={index + 1 <= rating} />
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
