import * as React from 'react';
import EmojiList from '../Components/EmojiList';

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
        }}>
        <h1>GitMoji</h1>
      </div>
      <EmojiList />
    </main>
  );
};

export default Home;
