import * as React from 'react';

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';

import { Dashboard } from './Pages/Dashboard';

import { AuthContextProvider, useAuthState } from './firebase/firebase';
import Home from './Pages/Home';
import Unauthorized from './Pages/Unauthorized';
import Navbar from './Components/Navbar';

export const RequireAuth = (props: any) => {
  const location = useLocation();
  const { user } = useAuthState();

  return user ? props.children : <Navigate to={'/unauthorized'} />;
};

export const RequireUnauth = (props: any) => {
  const { user } = useAuthState();
  return user ? <Navigate to='/' /> : props.children;
};

export const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/dashboard'
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path='/unauthorized/'
            element={
              <RequireUnauth>
                <Unauthorized />
              </RequireUnauth>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
};
