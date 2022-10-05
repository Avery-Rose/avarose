import Loading from '@nextui-org/react/loading';
import React, { useEffect } from 'react';

const url = 'https://discord.com/api/guilds/1006583002517745674/widget.json',
  getDiscordData = async () => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

interface IDiscord {
  id: string;
  name: string;
  instant_invite: string;
}

const Discord = () => {
  const [discord, setDiscord] = React.useState<IDiscord | null>(null);

  useEffect(() => {
    getDiscordData().then((data) => {
      setDiscord(data);
    });

    return () => {
      setDiscord(null);
    };
  }, []);

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
          <a href={discord.instant_invite} target='_blank' rel='noreferrer'>
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
