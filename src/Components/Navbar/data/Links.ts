import NavLink from '../models/NavLink';
import RequiredAuthState from '../types/RequiredAuthState';

const Links: NavLink[] = [
  {
    label: 'LinkedIn',
    reqAuthState: RequiredAuthState.Any,
    url: 'https://www.linkedin.com/in/averyrosedoucet',
    newPage: true,
  },
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
