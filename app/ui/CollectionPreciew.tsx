import Image from 'next/image';
import Link from 'next/link';
import { getPreviewFromCollectionOfCocktails } from '../lib/data';

export default async function CollectionPreview() {
  const previewCocktails = await getPreviewFromCollectionOfCocktails();

  return (
    <>
      {previewCocktails && (
        <div>
          {previewCocktails.map((preview) => (
            <div
              className="carouselInsideStyle"
              key={`cocktailid-${preview.id}`}
            >
              <div>
                <Link href={`/collection/${preview.id}`}>
                  <a>
                    <Image
                      src={`/images/cocktail/${preview.id}.svg`}
                      alt={preview.name}
                      width={300}
                      height={300}
                    />
                  </a>
                </Link>
              </div>
              <div>
                <Link href={`/collection/${preview.id}`}>
                  <a>{preview.name}</a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
