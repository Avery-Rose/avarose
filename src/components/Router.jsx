import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Main from '../Page/Main';
import Groups from '../Page/Groups';
import Chat from '../Page/Chat';
import NotFound from '../Page/NotFound';

const Router = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route exact path='/' element={<Main />} />
      <Route path='/groups/' element={<Groups />} />
      <Route path='/groups/:id' element={<Chat />} />
      <Route path='/404' element={<NotFound />} />
      <Route path='*' element={<Navigate to='/404' />} />
    </Routes>
  );
};

export default Router;
