import { useState, useEffect } from 'react';

import Spinner from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import Switch from '@mui/material/Switch';

import { useAuthState } from '../firebase/firebase';
import { FormControlLabel, FormGroup } from '@mui/material';

import { signOut, getAuth } from 'firebase/auth';

export const Settings = () => {
  const { user, loading } = useAuthState();

  const [avatar, setAvatar] = useState<string>('');

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
        <Typography variant='h4' style={{ marginTop: '1rem' }}>
          {user?.displayName}
        </Typography>
        <Typography variant='caption'>{user?.email}</Typography>
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
        🚧 Under Construction 🚧
      </FormGroup>
    </main>
  );
};
