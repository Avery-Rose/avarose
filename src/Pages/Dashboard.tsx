import * as React from 'react';
import Button from 'react-bootstrap/esm/Button';

import { getAuth, signOut } from 'firebase/auth';

export const Dashboard = () => {
  const handleLogout = () => {
    console.log('Logout');
    signOut(getAuth());
  };

  return (
    <main className='fill-W fill-H'>
      <h1>Dashboard</h1>
      <Button onClick={handleLogout} variant='primary'>
        Logout
      </Button>
    </main>
  );
};
