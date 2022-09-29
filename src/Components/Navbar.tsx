import * as React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from '../firebase/firebase';
import Burger from './Burger';
import { LoginButton } from './LoginButton';
import { LogoutButton } from './LogoutButton';

enum requiredAuthState {
  LoggedIn,
  LoggedOut,
  Any,
}

interface NavButton {
  label: string;
  reqAuthState: requiredAuthState;
  component: React.ReactElement;
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
  {
    path: '/dashboard',
    name: 'Dashboard',
    reqAuthState: requiredAuthState.LoggedIn,
  },
];

const Buttons: NavButton[] = [
  {
    label: 'Login',
    reqAuthState: requiredAuthState.LoggedOut,
    component: <LoginButton />,
  },
  {
    label: 'Logout',
    reqAuthState: requiredAuthState.LoggedIn,
    component: <LogoutButton />,
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

  return (
    <>
      <Burger open={open} setOpen={setOpen} />
      <ul className={open ? 'nav-links open' : 'nav-links'}>
        {Pages.map((page) => {
          if (hasPermission(page.reqAuthState)) {
            return (
              <li key={page.path}>
                <Link
                  to={page.path}
                  className={`nav-link ${
                    isActivePage(page.path) ? 'active' : ''
                  }`}
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
            const Component = button.component as React.ReactElement;

            return (
              <li key={button.label}>
                <div className='nav-link'>
                  {React.cloneElement(Component, {
                    action: handleLinkClick,
                  })}
                </div>
              </li>
            );
          }
          return null;
        })}
      </ul>
    </>
  );
};

export default Navbar;
