import { Metadata } from 'next';
import LoginForm from '../../components/LoginForm/clientComponent';

export const metadata: Metadata = {
  title: {
    template: 'Cocktails',
    default: 'Find your favourite Cocktail',
  },
  description: 'An app created and developed by Katharina Chalupsky.',
};

export default function Imprint() {
  return <main>This page does not exist. </main>;
}
