import Image from 'next/image';
import Link from 'next/link';
import { getPreviewFromCollectionOfCocktails } from '../lib/data';

export default async function CollectionPreview() {
  const previewCocktails = await getPreviewFromCollectionOfCocktails();

  console.log(previewCocktails, 'previewCocktails');

  return (
    <>
      {previewCocktails && (
        <div>
          {previewCocktails.map((preview, i) => (
            <div className="carouselInsideStyle" key={`cocktailid-${i}`}>
              <div>
                <Link href={`/collection/${preview.id}`}>
                  <Image
                    src={`/images/cocktail/${preview.id}.svg`}
                    alt={preview.name}
                    width={300}
                    height={300}
                  />
                </Link>
              </div>
              <div>
                <Link href={`/collection/${preview.id}`}>{preview.name}</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
