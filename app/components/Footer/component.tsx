import Marquee from 'react-fast-marquee';

export default function Footer() {
  return (
    <footer className="m-0 p-0">
      <Marquee speed={250} gradient={false}>
        <div className="marquee-messapia p-xl bg-white p-2 text-5xl">
          ! CHEERS! PROST! SALUTE! CIN CIN
        </div>
      </Marquee>
      <Marquee speed={150} gradient={false}>
        <div className="marquee-apfel bg-red p-1 uppercase ">
          ! HAPPY HOUR! AFTER HOUR! EVERY HOUR! COCKTAIL HOUR! HAPPY HOUR! AFTER
          HOUR! EVERY HOUR! COCKTAIL HOUR! HAPPY HOUR! AFTER HOUR! EVERY HOUR!
          COCKTAIL HOUR! HAPPY HOUR! AFTER HOUR! EVERY HOUR! COCKTAIL HOUR
        </div>
      </Marquee>
    </footer>
  );
}
