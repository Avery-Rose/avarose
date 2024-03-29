import React, { useEffect } from 'react';
// Login with Google
// import {
//   getAuth,
//   GoogleAuthProvider,
//   signInWithPopup,
//   signOut,
// } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useAuthState } from '../../firebase/firebase';
import Burger from '../Burger';

import RequiredAuthState from './types/RequiredAuthState';
import NavPage from './models/NavPage';
import NavButton from './models/NavButton';
import NavLink from './models/NavLink';

import Pages from '../Router/Routes';
import Buttons from './data/Buttons';
import Links from './data/Links';

const Navbar = () => {
  const { isAuthenticated } = useAuthState();
  const [open, setOpen] = React.useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  const isActivePage = (path: string) => window.location.pathname === path;
  const hasPermission = (reqAuthState: RequiredAuthState) => {
    if (reqAuthState === RequiredAuthState.Any) return true;

    if (isAuthenticated) {
      return reqAuthState === RequiredAuthState.LoggedIn;
    } else {
      return reqAuthState === RequiredAuthState.LoggedOut;
    }
  };

  const closeOnEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') setOpen(false);
  };

  useEffect(() => {
    // Add event listener on mount
    document.addEventListener('keydown', closeOnEsc);
    return () => document.removeEventListener('keydown', closeOnEsc);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  return (
    <header>
      <Burger open={open} setOpen={setOpen} />
      <nav>
        <ul
          aria-hidden={open ? 'false' : 'true'}
          className={open ? 'nav-links open' : 'nav-links'}
        >
          {Pages.map((page: NavPage) => {
            if (hasPermission(page.reqAuthState) && !page.hidden) {
              return (
                <li aria-hidden={open ? 'false' : 'true'} key={page.path}>
                  <Link
                    to={page.path}
                    className={`nav-link ${
                      isActivePage(page.path) ? 'active' : ''
                    }`}
                    aria-hidden={open ? 'false' : 'true'}
                    tabIndex={open ? 0 : -1}
                    onClick={handleLinkClick}
                  >
                    {page.name}
                  </Link>
                </li>
              );
            }
            return null;
          })}
          {Links.map((link: NavLink) => {
            if (!link.hidden) {
              return (
                <li key={link.label}>
                  <a
                    href={link.url}
                    className='nav-link'
                    aria-hidden={open ? 'false' : 'true'}
                    tabIndex={open ? 0 : -1}
                    onClick={handleLinkClick}
                    target={link.newPage ? '_blank' : ''}
                    rel={link.newPage ? 'noopener noreferrer' : ''}
                  >
                    {link.label}
                  </a>
                </li>
              );
            }
          })}
          {Buttons.map((button: NavButton) => {
            if (hasPermission(button.reqAuthState) && !button.hidden) {
              return (
                <li key={button.label}>
                  <div className='nav-link'>
                    <button
                      type='button'
                      aria-hidden={open ? 'false' : 'true'}
                      tabIndex={open ? 0 : -1}
                      onClick={() => button.action(handleLinkClick)}
                    >
                      {button.label}
                    </button>
                  </div>
                </li>
              );
            }
            return null;
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
