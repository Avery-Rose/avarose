import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { AuthContext } from '../Contexts/Auth';

const AuthContextProvider = (props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return <AuthContext.Provider value={{ user, loading }} {...props} />;
};

export default AuthContextProvider;
