import Loading from '@nextui-org/react/loading';
import React, { useEffect } from 'react';
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
    getDiscordData().then((data) => {
      setDiscord(data);
      console.log(data);
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
      }}>
      {discord ? (
        <>
          <h1>{discord.name}</h1>
          <div className='discord-list'>
            <div className='discord-list-header'>
              <a href={discord.instant_invite} target='_blank' rel='noreferrer'>
                Join the Discord
              </a>
            </div>
            <div className='discord-list-body'>
              {discord.members.map((member: any) => (
                <div key={member.id} className='discord-list-member'>
                  <img
                    className='discord-list-member-avatar'
                    src={member.avatar_url}
                    alt={member.username}
                  />
                  <span className='discord-list-member-username'>
                    {member.username}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default Discord;
