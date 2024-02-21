import RecommendationForm from '../../components/RecommendationForm/clientComponent';
import { getFlavours, getLevels, getSpirits } from '../../lib/data';

export default async function Page() {
  const flavours = await getFlavours();
  const spirits = await getSpirits();
  const levels = await getLevels();

  return (
    <main>
      <RecommendationForm
        flavours={flavours}
        spirits={spirits}
        levels={levels}
      />
    </main>
  );
}
