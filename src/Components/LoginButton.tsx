import { Button } from '@chakra-ui/react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import * as React from 'react';

import { FiLogIn } from 'react-icons/fi';

interface LoginButtonProps {
  action?: () => void;
  props?: any;
}

export const LoginButton = ({ action, ...props }: LoginButtonProps) => {
  const handleGoogleLogin = () => {
    signInWithPopup(getAuth(), new GoogleAuthProvider()).then(() => {
      if (action) action();
    });
  };

  return (
    <Button colorScheme='facebook' onClick={handleGoogleLogin} {...props}>
      <FiLogIn />
      Login
    </Button>
  );
};
