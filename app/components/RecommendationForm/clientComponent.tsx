'use client';
import { createRecommendation } from '@/app/lib/actions';
import { TFlavour, TLevel, TSpirit } from '@/app/lib/definitions';
import { useFormState } from 'react-dom';

type TRecommendationForm = {
  flavours: TFlavour[];
  spirits: TSpirit[];
  levels: TLevel[];
};

export default function RecommendationForm({
  flavours,
  spirits,
  levels,
}: TRecommendationForm) {
  const initialState = { message: null, errors: {} };

  const [state, dispatch] = useFormState(createRecommendation, initialState);

  return (
    <ul>
      <form action={dispatch}>
        <li>
          <h3>Flavour:</h3>
          {flavours.map((flavour: TFlavour, i: number) => {
            return (
              <div key={`flavour-${i}`}>
                <input
                  type="radio"
                  id="flavour"
                  name="flavour"
                  value={flavour.id}
                  aria-describedby="flavour-error"
                />
                <label htmlFor={flavour.name}>{flavour.name}</label>
              </div>
            );
          })}
        </li>

        <li>
          <h3>Spirit:</h3>
          {spirits.map((spirit: TSpirit, i: number) => {
            return (
              <div key={`flavour-${i}`}>
                <input
                  type="radio"
                  id="spirit"
                  name="spirit"
                  value={spirit.id}
                  aria-describedby="spirit-error"
                />
                <label htmlFor={spirit.name}>{spirit.name}</label>
              </div>
            );
          })}
        </li>

        <li>
          <h3>Level:</h3>
          {levels.map((level: TLevel, i: number) => {
            return (
              <div key={`level-${i}`}>
                <input
                  type="radio"
                  id="level"
                  name="level"
                  value={level.id}
                  aria-describedby="level-error"
                />

                <label htmlFor={`level-${level.level}`}>{level.level}</label>
              </div>
            );
          })}
        </li>

        <div id="name-error" aria-live="polite" aria-atomic="true">
          {state.errors?.flavour &&
            state.errors.flavour.map((error: any) => (
              <p className="text-red" key={error}>
                {error}
              </p>
            ))}
          {state.errors?.spirit &&
            state.errors.spirit.map((error: any) => (
              <p className="text-red" key={error}>
                {error}
              </p>
            ))}
          {state.errors?.level &&
            state.errors.level.map((error: any) => (
              <p className="text-red" key={error}>
                {error}
              </p>
            ))}

          <p className="text-red">{state.message}</p>
        </div>

        <button type="submit">Get a recommendation</button>
      </form>
    </ul>
  );
}
