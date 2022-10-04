import * as React from 'react';

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
        <h1>&lt;AvaRose /&gt;</h1>
      </div>
      <section
        style={{
          margin: '0 auto',
          textAlign: 'center',
          maxWidth: '800px',
        }}>
        <h2>🎉 Welcome to my website 👋</h2>
        <p>
          My name is Avery and I am a College Student at{' '}
          <a href='https://nbcc.ca/'>NBCC</a>. I am currently in my 2nd year of{' '}
          <a href='https://nbcc.ca/programs-courses/program-details?baseCurriculumId=a3dc93ce-e29b-49e5-bf3c-d5374530e205'>
            Web and Mobile Application Development
          </a>
          .
        </p>
      </section>
    </main>
  );
};

export default Home;
