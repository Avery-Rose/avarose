import * as React from 'react';

// Providers
import AuthProvider from './Providers/AuthProvider';
import Router from './Components/Router';

export const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};
