import * as React from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from "@firebase/app";
import { useContext, useEffect, useState, createContext } from "react";
import { User } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAu2fWviRwYnxY1aoq5QzMSRGJx5bE6wj0',
  authDomain: 'gitmoji-clone.firebaseapp.com',
  projectId: 'gitmoji-clone',
  storageBucket: 'gitmoji-clone.appspot.com',
  messagingSenderId: '828935022339',
  appId: '1:828935022339:web:eb52fea5b8e46fb3dbeb36',
  measurementId: 'G-FP0L6BPRLB'
};

export const firebaseApp = initializeApp(firebaseConfig);


// Context
export const AuthContext = createContext({
  user: null as User | null,
  loading: true,
});

// Provider

export const AuthContextProvider = props => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{user, loading}} {...props} />
  )
};

export const useAuthState = () => {
  const auth = useContext(AuthContext);
  return {...auth, isAuthenticated: auth.user != null};
}