import * as React from 'react';

import { getAuth, signOut } from 'firebase/auth';
import Button from '@nextui-org/react/button';

export const Dashboard = () => {
  const handleLogout = () => {
    console.log('Logout');
    signOut(getAuth());
  };

  return (
    <main className='fill-W fill-H'>
      <div
        className='fill-W fill-H'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        <h1>Dashboard</h1>
        <Button onClick={handleLogout} variant='contained' color='primary'>
          Logout
        </Button>
      </div>
    </main>
  );
};
