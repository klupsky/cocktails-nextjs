import About from './components/About/clientComponent';
import CollectionPreview from './components/CollectionPreview/serverComponent';
import Hero from './components/Hero/clientComponent';

export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <CollectionPreview />
    </main>
  );
}
