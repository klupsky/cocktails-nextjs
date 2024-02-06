import '@/app/ui/global.css';
import '@/app/ui/fonts.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Cocktails',
    default: 'Find your favourite Cocktail',
  },
  description: 'An app created and developed by Katharina Chalupsky.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
