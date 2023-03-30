import React, { useEffect, useState } from 'react';
import { authContext } from '../../contexts/auth';

type Props = {
  children: React.ReactNode;
};
export const AuthProvider = ({ children }: Props) => {
  const [user, setUsedr] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    // todo: validate JSON

    if (user) {
      try {
        setUsedr(JSON.parse(user));
        setLoading(false);
      } catch {}
    }

    setLoading(false);
  }, []);

  return (
    <authContext.Provider
      value={{
        isLoading: loading,
        user,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
