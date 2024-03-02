'use client';
import { TUserFromParams } from '@/app/lib/definitions';
import { signOut } from '@/auth';
import Link from 'next/link';
import React, { useState } from 'react';

type TMenuProps = {
  user?: TUserFromParams | null | undefined;
  handleSignOut: () => Promise<void>;
};

const Menu = ({ user, handleSignOut }: TMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="width-full relative">
      <button
        onClick={toggleMenu}
        className="absolute right-12 top-12 z-10 flex flex-col items-center justify-center"
      >
        <span
          className={`block h-0.5 w-6 rounded-sm bg-black transition-all duration-300 ease-out ${
            menuOpen ? 'translate-y-1 rotate-45' : '-translate-y-0.5'
          }`}
        ></span>
        <span
          className={`my-0.5 block h-0.5 w-6 rounded-sm bg-black transition-all duration-300 ease-out ${
            menuOpen ? 'opacity-0' : 'opacity-100'
          }`}
        ></span>
        <span
          className={`block h-0.5 w-6 rounded-sm bg-black transition-all duration-300 ease-out ${
            menuOpen ? '-translate-y-1 -rotate-45' : 'translate-y-0.5'
          }`}
        ></span>
      </button>

      <div
        className={`z-2 fixed top-0 h-[100vh] w-full bg-red transition-all duration-300 ease-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {user ? (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              await handleSignOut();
              setMenuOpen(false);
            }}
          >
            <button type="submit">
              <div>Sign Out</div>
            </button>
          </form>
        ) : (
          <Link href="/login">Sign In</Link>
        )}
      </div>
    </div>
  );
};

export default Menu;
