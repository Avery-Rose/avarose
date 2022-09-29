import * as React from 'react';
import { getAuth, signOut } from 'firebase/auth';

import { Button } from 'react-bootstrap';

interface LogoutButtonProps {
  action?: () => void;
  props?: any;
}

export const LogoutButton = ({ action, ...props }: LogoutButtonProps) => {
  const handleLogout = () => {
    signOut(getAuth()).then(() => {
      if (action) action();
    });
  };

  return (
    <Button onClick={handleLogout} variant='primary'>
      Logout
    </Button>
  );
};
