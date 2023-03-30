import React, { useEffect } from 'react';
import Loading from '@nextui-org/react/loading';
import ReactGA from 'react-ga4';
import './style.scss';
import { Container, Typography } from '@mui/material';
import { seo, SeoData } from '../../Helpers/seo';

const url = 'https://discord.com/api/guilds/1006583002517745674/widget.json',
  getDiscordData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

interface IDiscord {
  presence_count: number;
  members: Array<any>;
  id: string;
  name: string;
  instant_invite: string;
}

const Discord = () => {
  const [error, setError] = React.useState<Error | null>(null);
  const [discord, setDiscord] = React.useState<IDiscord | null>(null);

  useEffect(() => {
    setError(null);
    setDiscord(null);

    ReactGA.send({
      hitType: 'pageview',
      page: window.location.pathname,
    });

    seo({
      title: 'AvaRose - Discord',
      metaDescription: 'Join the Discord',
    });

    getDiscordData()
      .then((data) => {
        setDiscord(data);
      })
      .catch((err) => {
        setError(err);
      });

    return () => {
      setDiscord(null);
      setError(null);
    };
  }, []);

  const clickInvite = () => {
    ReactGA.event({
      category: 'Discord',
      action: 'Click Invite',
      label: 'Discord Invite',
    });
    return;
  };

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {discord ? (
        <>
          <h1>{discord.name}</h1>
          <a
            onClick={clickInvite}
            href={discord.instant_invite}
            rel='noreferrer'
            target='_blank'
          >
            Join the Discord
          </a>
        </>
      ) : error ? (
        <>
          <Typography variant='h3' color='error'>
            {error.message}
          </Typography>
          <Typography
            variant='h6'
            color='error'
            style={{
              position: 'absolute',
              bottom: 0,
            }}
          >
            *Try disabling your adblocker or any other extensions that may be
            blocking the request.
          </Typography>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default Discord;
