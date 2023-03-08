import RequiredAuthState from '../types/RequiredAuthState';

interface NavLink {
  label: string;
  reqAuthState: RequiredAuthState;
  url: string;
  newPage?: boolean;
  hidden?: boolean;
}

export default NavLink;
