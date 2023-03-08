import NavLink from '../models/NavLink';
import NavPage from '../models/NavPage';
import RequiredAuthState from '../types/RequiredAuthState';

const Links: NavLink[] = [
  {
    label: 'Contact',
    reqAuthState: RequiredAuthState.Any,
    url: 'mailto:avery@avarose.dev',
    newPage: true,
  },
  {
    label: 'GitHub',
    reqAuthState: RequiredAuthState.Any,
    url: 'https://www.github.com/Avery-Rose',
    newPage: true,
  },
];

export default Links;
