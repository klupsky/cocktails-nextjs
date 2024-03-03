import Wave from 'react-wavify';

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] p-4 md:min-h-[100vh] md:p-8">
      <h1 className="headline-xl pt-[30vh] text-center">
        do you
        <br />
        fancy a cocktail?
      </h1>
      <div className="absolute bottom-0 left-0 w-full">
        <Wave
          fill="var(--c-purple)"
          paused={false}
          options={{
            height: 15,
            amplitude: 30,
            speed: 0.4,
            points: 2,
          }}
        />
      </div>
    </section>
  );
}
