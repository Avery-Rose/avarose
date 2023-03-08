import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import NavButton from '../models/NavButton';
import RequiredAuthState from '../types/RequiredAuthState';

const Buttons: NavButton[] = [
  {
    label: 'Login',
    reqAuthState: RequiredAuthState.LoggedOut,
    action: () => {
      signInWithPopup(getAuth(), new GoogleAuthProvider());
    },
    hidden: true,
  },
  {
    label: 'Logout',
    reqAuthState: RequiredAuthState.LoggedIn,
    action: (func) => {
      signOut(getAuth()).then(() => {
        if (func) func();
      });
    },
    hidden: true,
  },
];

export default Buttons;
