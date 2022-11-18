import React from 'react';
import ReactGA from 'react-ga4';

const GA_TRACKING_ID = 'G-145KR80W1Q';

ReactGA.initialize([
  {
    trackingId: GA_TRACKING_ID,
  },
]);

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
