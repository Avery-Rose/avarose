import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { useAuthState } from '../../firebase/firebase';

// Components
import Navbar from '../Navbar/Navbar';
import Loading from '@nextui-org/react/loading';
// Pages
import Home from '../../Pages/Home';
import Settings from '../../Pages/Settings';
import NotFound from '../../Pages/NotFound';
import Unauthorized from '../../Pages/Unauthorized';
import Discord from '../../Pages/Discord';

import RequiredAuthState from '../Navbar/types/RequiredAuthState';
import RouterRoutes from './Routes';

export const RequireAuth = (props: any) => {
  const { user, loading } = useAuthState();

  return loading ? (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
      }}>
      <Loading />
    </main>
  ) : user ? (
    props.children
  ) : (
    <Navigate to='/unauthorized' />
  );
};

export const RequireUnauth = (props: any) => {
  const { user } = useAuthState();
  return user ? <Navigate to='/' /> : props.children;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {RouterRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              route.reqAuthState === RequiredAuthState.LoggedIn ? (
                <RequireAuth>
                  <route.component />
                </RequireAuth>
              ) : route.reqAuthState === RequiredAuthState.LoggedOut ? (
                <RequireUnauth>
                  <route.component />
                </RequireUnauth>
              ) : (
                <route.component />
              )
            }
          />
        ))}
        <Route path='*' element={<Navigate to='/404' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
