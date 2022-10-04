import { useState, useEffect } from 'react';

import Spinner from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import { useAuthState } from '../firebase/firebase';
import { FormGroup } from '@mui/material';

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
        <Spinner />
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
        <Avatar src={avatar} sx={{ width: 100, height: 100 }} />
        <Typography
          variant='h4'
          style={{ textAlign: 'center', marginTop: '1rem' }}>
          {user?.displayName}
        </Typography>

        <h5
          style={{
            textAlign: 'center',
          }}>
          {email}
        </h5>
        <Button onClick={toggleShowEmail}>
          {displayEmail ? 'Hide Email' : 'Show Email'}
        </Button>
        <Button
          onClick={() => {
            signOut(getAuth());
          }}
          variant='contained'
          style={{ marginTop: '1rem' }}>
          Sign Out
        </Button>
      </Container>
      <FormGroup
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
      </FormGroup>
    </main>
  );
};
