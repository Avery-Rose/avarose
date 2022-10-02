import * as React from 'react';

import { Divider, Text } from '@chakra-ui/react';

const Home = () => {
  return (
    <main>
      <div
        className='background-primary'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '250px',
          height: '40vh',
          width: '100%',
          textAlign: 'center',
        }}>
        <Text fontSize='5xl' color='white' noOfLines={[1, 2, 3]}>
          &lt;AvaRose /&gt;
        </Text>
      </div>
      <section
        style={{
          margin: '0 auto',
          textAlign: 'center',
          maxWidth: '800px',
        }}>
        <Text fontSize='4xl'>🎉 Welcome to my website 👋</Text>
        <Divider />
        <Text fontSize='xl'>
          My name is Avery and I am a College Student at NBCC. I am currently in
          my 2nd year of Web and Mobile Application Development.
        </Text>
      </section>
    </main>
  );
};

export default Home;
