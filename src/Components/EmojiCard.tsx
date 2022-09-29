import * as React from 'react';

import { Emoji } from '../Interface/Emoji';

const EmojiCard = ({ emoji, code, description, color }: Emoji) => {
  return (
    <div className='emoji-card'>
      <div
        className='emoji-card__emoji'
        style={{
          backgroundColor: color,
        }}>
        <button>{emoji}</button>
      </div>
      <div className='emoji-card__code'>{code}</div>
      <p className='emoji-card__description'>{description}</p>
    </div>
  );
};

export default EmojiCard;
