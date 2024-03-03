import Link from 'next/link';

export default function About() {
  return (
    <section className="r relative flex min-h-[70vh]  bg-purple  p-4 md:p-8">
      <div className="left absolute flex rotate-[-15deg] transform justify-center rounded-full bg-white px-4 py-3 text-center text-xs uppercase">
        <p>sure you do!</p>
      </div>

      <div className="flex h-full flex-col items-center justify-center gap-6">
        <p>
          you are chillin&apos; after a hard day in a bar, life is good and you
          feel like a cocktail would add on to this perfect moment ...
        </p>

        <p>but which one is right for you?</p>

        <Link href="/recommendation">find a cocktail</Link>
      </div>
    </section>
  );
}
