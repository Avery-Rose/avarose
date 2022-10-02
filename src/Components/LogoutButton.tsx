import * as React from 'react';
import { getAuth, signOut } from 'firebase/auth';

import { Button } from '@chakra-ui/react';

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
    <Button colorScheme='facebook' onClick={handleLogout}>
      Logout
    </Button>
  );
};
