import '@/app/global.css';
import '@/app/fonts.css';
import { signOut } from '@/auth';
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
      <body>
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

        {children}
      </body>
    </html>
  );
}
