import React, { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { seo } from '../Helpers/seo';

const Home = () => {
  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: window.location.pathname,
    });

    seo({
      title: 'AvaRose - Home',
      metaDescription: "Avery Rose's personal website",
    });
  }, []);

  return (
    <main>
      <div
        className='heading'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '250px',
          height: '40vh',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <h1>&lt;/&gt; AvaRose</h1>
      </div>
      <section
        style={{
          margin: '0 auto',
          textAlign: 'center',
          maxWidth: '800px',
        }}
      >
        <h2>🎉 Welcome to my website 👋</h2>
        <p>My name is Ava and I am a College Student.</p>
        <p>
          You can find the repo for this website on{' '}
          <a href='https://github.com/Avery-Rose/avarose.dev'>github</a>
        </p>
      </section>
    </main>
  );
};

export default Home;
