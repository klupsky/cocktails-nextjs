import '@/app/global.css';
import '@/app/fonts.css';
import { auth, signOut } from '@/auth';
import { Metadata } from 'next';
import Link from 'next/link';
import Footer from './components/Footer/component';
import Menu from './components/Menu/component';

export const metadata: Metadata = {
  title: {
    template: '%s | Cocktails',
    default: 'Find your favourite Cocktail',
  },
  description: 'An app created and developed by Katharina Chalupsky.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const user = session?.user;


  const handleSignOut = async () => {
    'use server';
    await signOut();
  };
  return (
    <html lang="en">
      <body className="body-md">
        <Menu user={user} handleSignOut={handleSignOut} />

        {children}

        <Footer />
      </body>
    </html>
  );
}
