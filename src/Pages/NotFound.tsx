import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { seo } from '../Helpers/seo';

const NotFound = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: window.location.pathname,
    });

    seo({
      title: 'AvaRose - 404',
      metaDescription: 'Page Not Found',
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
      <h1>Not Found</h1>
    </main>
  );
};

export default NotFound;
