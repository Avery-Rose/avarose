import { initializeApp } from '@firebase/app';
import { useContext } from 'react';
import { AuthContext } from '../Contexts/Auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCHjOaa9LukOk1SDZmsY-6MvRgw6Fv7DDE',
  authDomain: 'ava-rose-dev.firebaseapp.com',
  projectId: 'ava-rose-dev',
  storageBucket: 'ava-rose-dev.appspot.com',
  messagingSenderId: '357468416934',
  appId: '1:357468416934:web:caba1ce5604817f9463d67',
  measurementId: 'G-145KR80W1Q',
};

export const firebaseApp = initializeApp(firebaseConfig);

export const useAuthState = () => {
  const auth = useContext(AuthContext);
  return { ...auth, isAuthenticated: auth.user !== null };
};
