import { Container, Divider, Link } from '@mui/material';
import React from 'react';
import './index.css';

const Main = () => {
  return (
    <main>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          textAlign: 'center',
        }}>
        <h1>🎉 Welcome to my website 👋</h1>
        <Divider
          sx={{
            width: '100%',
            height: '1px',
            backgroundColor: 'white',
            margin: '1rem 0',
          }}
        />
        <p>
          This is a website I made to learn{' '}
          <a href='https://reactjs.org/' className='react'>
            React
          </a>{' '}
          and{' '}
          <a href='https://firebase.google.com/' className='firebase'>
            Firebase
          </a>
          . It's a social media website where you can create groups and chat
          with your friends.
        </p>
        <p>
          This project is still in development, and open source so feel free to
          contribute. 😊
        </p>
        <Link target='_blank' href='https://github.com/avery-rose/avarose.dev'>
          View On Github
        </Link>
        <br />
        <span>
          Made With <span className='heart'>❤</span> by Avery Rose
        </span>
      </Container>
    </main>
  );
};

export default Main;
