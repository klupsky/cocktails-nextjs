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

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <button onClick={handleToggleMenu}>
        {menuOpen ? 'Close Menu' : 'Open Menu'}
      </button>

      {menuOpen && (
        <div className="menu-container">
          {user ? (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await handleSignOut();
                setMenuOpen(false); // Close the menu after signing out
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
      )}
    </div>
  );
};

export default Menu;
