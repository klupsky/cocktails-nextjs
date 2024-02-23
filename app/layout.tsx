import '@/app/global.css';
import '@/app/fonts.css';
import { auth, signOut } from '@/auth';
import { Metadata } from 'next';
import Link from 'next/link';

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
  return (
    <html lang="en">
      <body>
        {user ? (
          <form
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button>
              <div>Sign Out</div>
            </button>
          </form>
        ) : (
          <Link href="/login">Sign In</Link>
        )}

        {children}
      </body>
    </html>
  );
}
