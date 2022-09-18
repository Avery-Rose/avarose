import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { auth } from './firebaseSetup';
import { UserContext } from './context/UserContext';

import Navbar from './components/Navbar';
import { SnackbarProvider } from 'notistack';
import BottomNav from './components/BottomNav';

import Router from './components/Router';
import { GoogleAuthProvider } from 'firebase/auth';

const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <SnackbarProvider
      maxSnack={3}
      preventDuplicate
      autoHideDuration={2000}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <Navbar />
          <Router />
          <BottomNav />
        </BrowserRouter>
      </ThemeProvider>
    </SnackbarProvider>
  </AuthProvider>
);
