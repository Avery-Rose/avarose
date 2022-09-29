import React, { useEffect } from 'react';
import SearchBar from './components/SearchBar';
import { emojis } from './Emoji';
import './style.css';

const App = () => {
  const [filter, setFilter] = React.useState('');
  const [filteredEmojis, setFilteredEmojis] = React.useState(emojis);

  useEffect(() => {
    document.title = 'Gitmoji' + (filter ? ` - ${filter}` : '');

    setFilteredEmojis(
      emojis.filter((emoji) => {
        return emoji.includes(filter);
      })
    );

    return () => {
      document.title = 'Gitmoji';
    };
  }, [filter]);

  return (
    <main>
      <SearchBar setField={setFilter} />
      <div className='cards'>
        {filteredEmojis.map((emoji) => emoji.toCard())}
      </div>
    </main>
  );
};

export default App;
