import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import ReactGA from 'react-ga4';
import Button from '@nextui-org/react/button';

interface LogoutButtonProps {
  action?: () => void;
  props?: any;
}

export const LogoutButton = ({ action }: LogoutButtonProps) => {
  const handleLogout = () => {
    signOut(getAuth()).then(() => {
      if (action) action();
    });

    ReactGA.event({
      action: 'Logout',
      category: 'Account',
      label: 'Google Logout',
    });
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};
