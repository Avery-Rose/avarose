import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import ReactGA from 'react-ga4';
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

    ReactGA.event({
      action: 'Login',
      category: 'Account',
      label: 'Google Login',
    });
  };

  return (
    <Button onClick={handleGoogleLogin} {...props}>
      <FiLogIn />
      Login
    </Button>
  );
};
