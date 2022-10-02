import * as React from 'react';

// Providers
import { AuthContextProvider } from './firebase/firebase';
import ThemeProvider from './Providers/ThemeProvider';
import Router from './Components/Router';

export const App = () => {
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </AuthContextProvider>
  );
};
