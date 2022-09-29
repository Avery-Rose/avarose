import logo from './logo.svg';

export const Header = () => {
  return (
    <header>
      <img src={logo} className='App-logo' alt='logo' />
      <h2>An emoji guide for your commit messages</h2>
    </header>
  );
};
