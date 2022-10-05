import { User } from 'firebase/auth';
import { createContext } from 'react';

export const AuthContext = createContext({
  user: null as User | null,
  loading: true,
});
