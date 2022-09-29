import { useEffect, useState } from 'react';

interface SearchBarProps {
  setField?: (term: string) => void;
}

const SearchBar = ({ setField }: SearchBarProps) => {
  const [term, setTerm] = useState('');
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);

    if (setField) {
      setField(event.target.value);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        setTerm('');
        break;
      case '/':
        event.preventDefault();
        document.getElementById('search-bar')?.focus();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className='search-bar'>
      <input
        id='search-bar'
        value={term}
        onChange={onInputChange}
        placeholder='Search gitmoji...'
      />
      <kbd>/</kbd>
    </div>
  );
};

export default SearchBar;
