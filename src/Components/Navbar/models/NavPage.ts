import RequiredAuthState from '../types/RequiredAuthState';

interface NavPage {
  name: string;
  path: string;
  reqAuthState: RequiredAuthState;
  hidden: boolean;
}

export default NavPage;
