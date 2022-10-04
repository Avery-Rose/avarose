import * as React from 'react';
import { getAuth, signOut } from 'firebase/auth';

import Button from '@mui/material/Button';

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

  return <Button onClick={handleLogout}>Logout</Button>;
};
