import RequiredAuthState from '../types/RequiredAuthState';

interface NavButton {
  label: string;
  reqAuthState: RequiredAuthState;
  action: (any) => void;
}

export default NavButton;
