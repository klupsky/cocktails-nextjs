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
        className="absolute right-12 top-12 z-20 flex flex-col items-center justify-center"
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
        className={`fixed top-0 z-10 flex h-[100vh] w-full flex-col items-center justify-between bg-red p-12 transition-all duration-300 ease-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        onClick={toggleMenu}
      >
        <div className="max-w-[120px] text-center">
          <Link href="/">
            <h3 className="headline-md">Fancy a cocktail?</h3>
          </Link>
        </div>

        <ul className="headline-lg flex flex-col gap-4 text-center">
          <li>
            <Link href="/recommendation">Find a cocktail</Link>
          </li>

          <li>
            <Link href="/collection">Full Collection</Link>
          </li>
          {user && (
            <li>
              <Link href="/dashboard">Your selection</Link>
            </li>
          )}
        </ul>

        <ul className="flex gap-8">
          {user ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await handleSignOut();
                setMenuOpen(false);
              }}
            >
              <button type="submit">
                <li>Sign Out</li>
              </button>
            </form>
          ) : (
            <>
              <li>
                <Link href="/login">Sign In</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
            </>
          )}

          <li>
            <Link href="/imprint">imprint</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
