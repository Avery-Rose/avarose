import React, { useEffect } from 'react';
import { seo } from '../Helpers/seo';

const Unauthorized = () => {
  useEffect(() => {
    seo({
      title: 'AvaRose - Unauthorized',
      metaDescription: 'Unauthorized',
    });
  }, []);

  return (
    <main
      className='fill-W fill-H'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>Unauthorized</h1>
    </main>
  );
};

export default Unauthorized;
