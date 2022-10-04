import React, { useState, useEffect } from 'react';

import { Loading, Container, Button, Avatar } from '@nextui-org/react';
import Switch from '@nextui-org/react/switch';

import { useAuthState } from '../firebase/firebase';

import { signOut, getAuth } from 'firebase/auth';

export const Settings = () => {
  const { user, loading } = useAuthState();

  const [avatar, setAvatar] = useState<string>('');

  const [displayEmail, setDisplayEmail] = useState<boolean>(false);
  const toggleShowEmail = () => setDisplayEmail(!displayEmail);

  const email = displayEmail
    ? user?.email
    : user?.email?.replace(/^(.)(.*)(@.*)$/, '$1***$3');

  useEffect(() => {
    if (loading) return;
    if (!user) return;
    if (!user.photoURL) return;
    setAvatar(user.photoURL);
  }, [loading, user]);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  return (
    <main className='fill-W fill-H'>
      <Container
        style={{
          padding: '5rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Avatar src={avatar} style={{ width: 100, height: 100 }} />
        <h4 style={{ textAlign: 'center', marginTop: '1rem' }}>
          {user?.displayName}
        </h4>

        <h5
          style={{
            textAlign: 'center',
            marginTop: '0.5rem',
          }}>
          {email}
        </h5>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row-reverse',
            alignItems: 'center',
            marginTop: '1rem',
            gap: '1rem',
          }}>
          <span>{displayEmail ? 'Hide' : 'Reveal'}</span>
          <Switch bordered onChange={toggleShowEmail} checked={displayEmail} />
        </div>
        <Button
          onClick={() => {
            signOut(getAuth());
          }}
          style={{ marginTop: '1rem' }}>
          Sign Out
        </Button>
      </Container>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {/* <FormControlLabel
          control={<Switch />}
          label='Dark Mode'
          labelPlacement='start'
        /> */}
        <h4
          style={{
            textAlign: 'center',
          }}>
          🚧 Under Construction 🚧
        </h4>
      </div>
    </main>
  );
};
