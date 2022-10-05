import React, { useEffect } from 'react';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useAuthState } from '../firebase/firebase';
import Burger from './Burger';

enum requiredAuthState {
  LoggedIn,
  LoggedOut,
  Any,
}

interface NavButton {
  label: string;
  reqAuthState: requiredAuthState;
  action: (any) => void;
}

interface NavPage {
  name: string;
  path: string;
  reqAuthState: requiredAuthState;
}

const Pages: NavPage[] = [
  {
    path: '/',
    name: 'Home',
    reqAuthState: requiredAuthState.Any,
  },
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   reqAuthState: requiredAuthState.LoggedIn,
  // },
  {
    path: '/settings',
    name: 'Settings',
    reqAuthState: requiredAuthState.LoggedIn,
  },
  {
    path: '/discord',
    name: 'Discord',
    reqAuthState: requiredAuthState.Any,
  },
];

const Buttons: NavButton[] = [
  {
    label: 'Login',
    reqAuthState: requiredAuthState.LoggedOut,
    action: () => {
      signInWithPopup(getAuth(), new GoogleAuthProvider());
    },
  },
  {
    label: 'Logout',
    reqAuthState: requiredAuthState.LoggedIn,
    action: (func) => {
      signOut(getAuth()).then(() => {
        if (func) func();
      });
    },
  },
];

const Navbar = () => {
  const { isAuthenticated } = useAuthState();
  const [open, setOpen] = React.useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  const isActivePage = (path: string) => window.location.pathname === path;
  const hasPermission = (reqAuthState: requiredAuthState) => {
    if (reqAuthState === requiredAuthState.Any) return true;

    if (isAuthenticated) {
      return reqAuthState === requiredAuthState.LoggedIn;
    } else {
      return reqAuthState === requiredAuthState.LoggedOut;
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
          className={open ? 'nav-links open' : 'nav-links'}>
          {Pages.map((page) => {
            if (hasPermission(page.reqAuthState)) {
              return (
                <li aria-hidden={open ? 'false' : 'true'} key={page.path}>
                  <Link
                    to={page.path}
                    className={`nav-link ${
                      isActivePage(page.path) ? 'active' : ''
                    }`}
                    aria-hidden={open ? 'false' : 'true'}
                    tabIndex={open ? 0 : -1}
                    onClick={handleLinkClick}>
                    {page.name}
                  </Link>
                </li>
              );
            }
            return null;
          })}
          {Buttons.map((button) => {
            if (hasPermission(button.reqAuthState)) {
              return (
                <li key={button.label}>
                  <div className='nav-link'>
                    <button
                      aria-hidden={open ? 'false' : 'true'}
                      tabIndex={open ? 0 : -1}
                      onClick={() => button.action(handleLinkClick)}>
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
