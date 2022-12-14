import React, { useEffect } from 'react';
import Loading from '@nextui-org/react/loading';
import ReactGA from 'react-ga4';
import './style.scss';

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
  const [discord, setDiscord] = React.useState<IDiscord | null>(null);

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: window.location.pathname,
    });
    getDiscordData().then((data) => {
      setDiscord(data);
    });

    return () => {
      setDiscord(null);
    };
  }, []);

  const clickInvite = () => {
    ReactGA.event({
      category: 'Discord',
      action: 'Click Invite',
      label: 'Discord Invite',
    });

    window.open(discord.instant_invite, '_blank');
    return;
  };

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      {discord ? (
        <>
          <h1>{discord.name}</h1>
          <a onClick={clickInvite} rel='noreferrer'>
            Join the Discord
          </a>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default Discord;
