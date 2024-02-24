'use client';

import Image from 'next/image';

export default function FavouritesSum({
  favouritesSum,
}: {
  favouritesSum: number;
}) {
  return (
    <div>
      <Image
        src="/../../images/components/heart1.svg"
        width={24}
        height={24}
        alt="is favourite"
      />
      {favouritesSum}
    </div>
  );
}
