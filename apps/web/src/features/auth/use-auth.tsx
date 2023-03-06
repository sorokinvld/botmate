import { User } from '@prisma/client';
import { createContext, useContext } from 'react';
import { useGetProfileQuery, useIsUserFirstQuery } from './auth-api';

const authContext = createContext(
  {} as {
    isUserFirst: boolean;
    user: User | null;
    isLoading: boolean;
  },
);

type AuthProviderProps = {
  children: React.ReactNode;
};
function AuthProvider({ children }: AuthProviderProps) {
  const isUserFirst = useIsUserFirstQuery();
  const userProfile = useGetProfileQuery();

  return (
    <authContext.Provider
      value={{
        isUserFirst: isUserFirst.data ?? false,
        user: userProfile.data ?? null,
        isLoading: userProfile.isLoading,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};
export { AuthProvider };
