import * as React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { useAuthState } from '../firebase/firebase';

// Components
import Navbar from '../Components/Navbar';
import { Loading } from '@nextui-org/react';
// Pages
import Home from '../Pages/Home';
import { Settings } from '../Pages/Settings';
import NotFound from '../Pages/NotFound';
import Unauthorized from '../Pages/Unauthorized';

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
        <Route
          path='/'
          element={
            <>
              <Home />
            </>
          }
        />
        {/* <Route
          path='/dashboard'
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        /> */}
        <Route
          path='/unauthorized/'
          element={
            <RequireUnauth>
              <Unauthorized />
            </RequireUnauth>
          }
        />
        <Route
          path='/settings'
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />
        <Route
          path='/404'
          element={
            <>
              <NotFound />
            </>
          }
        />
        <Route path='*' element={<Navigate to='/404' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
