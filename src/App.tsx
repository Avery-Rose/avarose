import * as React from 'react';

// Providers
import { AuthContextProvider } from './firebase/firebase';
import Router from './Components/Router';

export const App = () => {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
};
