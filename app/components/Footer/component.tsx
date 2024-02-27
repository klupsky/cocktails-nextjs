import Marquee from 'react-fast-marquee';

export default function Footer() {
  return (
    <footer className="m-0 p-0">
      <Marquee speed={250} gradient={false}>
        <span className="headline-md marquee-messapia p-xs mt-0 bg-white">
          ! CHEERS! PROST! SALUTE! CIN CIN
        </span>
      </Marquee>
      <Marquee speed={150} gradient={false}>
        <span className="p-sm marquee-apfel  bg-red uppercase ">
          ! HAPPY HOUR! AFTER HOUR! EVERY HOUR! COCKTAIL HOUR! HAPPY HOUR! AFTER
          HOUR! EVERY HOUR! COCKTAIL HOUR! HAPPY HOUR! AFTER HOUR! EVERY HOUR!
          COCKTAIL HOUR! HAPPY HOUR! AFTER HOUR! EVERY HOUR! COCKTAIL HOUR
        </span>
      </Marquee>
    </footer>
  );
}
