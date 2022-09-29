import * as React from 'react';

import { Emoji } from '../Interface/Emoji';
import EmojiCard from './EmojiCard';

const emojis: Emoji[] = [
  {
    emoji: '🎨',
    code: ':art:',
    description: 'Improve structure / format of the code.',
    color: '#ffb86c',
  },
  {
    emoji: '⚡️',
    code: ':zap:',
    description: 'Improve performance.',
    color: '#fbc531',
  },
  {
    emoji: '🔥',
    code: ':fire:',
    description: 'Remove code or files.',
    color: '#f0932b',
  },
  {
    emoji: '🐛',
    code: ':bug:',
    description: 'Fix a bug.',
    color: '#00ff00',
  },
  {
    emoji: '🚑',
    code: ':ambulance:',
    description: 'Critical hotfix.',
    color: '#02d7e1',
  },
];

const EmojiList = () => {
  return (
    <div className='emoji-grid'>
      {emojis.map((emoji, index) => {
        return <EmojiCard key={index} {...emoji} />;
      })}
    </div>
  );
};

export default EmojiList;
