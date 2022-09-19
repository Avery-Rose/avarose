import { Container } from '@mui/material';
import React from 'react';

import './index.css';

const NotFound = () => (
  <main>
    <Container className='center lost-container'>
      <h1 className='lost-title'>404</h1>
      <p>Page not found</p>
      <p>Look's like you're lost</p>
    </Container>
  </main>
);

export default NotFound;
