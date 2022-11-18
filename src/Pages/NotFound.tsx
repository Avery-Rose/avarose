import React, { useEffect } from 'react';
import ReactGA from 'react-ga';

const NotFound = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <main
      className='fill-W fill-H'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <h1>Not Found</h1>
    </main>
  );
};

export default NotFound;
