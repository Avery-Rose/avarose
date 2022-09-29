import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import * as React from 'react';
import { Button } from 'react-bootstrap';

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
    <Button onClick={handleGoogleLogin} variant='primary'>
      Login with Google
    </Button>
  );
};
