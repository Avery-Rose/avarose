import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import React from 'react';

import { FiLogIn } from 'react-icons/fi';

import Button from '@nextui-org/react/button';

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
    <Button onClick={handleGoogleLogin} {...props}>
      <FiLogIn />
      Login
    </Button>
  );
};
