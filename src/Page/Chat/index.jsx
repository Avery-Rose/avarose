import React from 'react';
import { performance } from '../../firebaseSetup';

const Chat = () => {
  console.log(performance);

  return (
    <main>
      <div className='center'>
        <h2>🚧 Oops 🚧</h2>
        <p>
          Looks like you found something under construction be patient and come
          back later.
        </p>
      </div>
    </main>
  );
};

export default Chat;
