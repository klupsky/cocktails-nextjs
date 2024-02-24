import { TPreviewCocktail } from '@/app/lib/definitions';
import Image from 'next/image';
import Link from 'next/link';
import { getPreviewFromCollectionOfCocktails } from '../../lib/data';

export default async function CollectionPreview() {
  const previewCocktails = await getPreviewFromCollectionOfCocktails();

  return (
    <>
      {previewCocktails && (
        <div>
          {previewCocktails.map((preview: TPreviewCocktail, i: number) => (
            <div className="carouselInsideStyle" key={`cocktailid-${i}`}>
              <div>
                <Link href={`/collection/${preview.slug}`}>
                  <Image
                    src={`/images/cocktail/${preview.id}.svg`}
                    alt={preview.name}
                    width={300}
                    height={300}
                  />
                </Link>
              </div>
              <div>
                <Link href={`/collection/${preview.name}`}>{preview.slug}</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
