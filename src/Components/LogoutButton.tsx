import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import ReactGA from 'react-ga4';
import Button from '@nextui-org/react/button';

interface LogoutButtonProps {
  action?: () => void;
  props?: any;
}

export const LogoutButton = ({ action, ...props }: LogoutButtonProps) => {
  const handleLogout = () => {
    signOut(getAuth()).then(() => {
      if (action) action();
    });

    ReactGA.send({
      hitType: 'event',
      action: 'Logout',
      category: 'Account',
    });
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};
