import { User } from '@prisma/client';
import { createContext, useContext } from 'react';
import {
  useGetProfileQuery,
  useIsUserFirstQuery,
  useLoginMutation,
} from './reducer';
import { LoginUserDTO } from 'common';

const authContext = createContext(
  {} as {
    isUserFirst: boolean;
    user: User | null;
    isLoading: boolean;
    login: (userData: LoginUserDTO) => Promise<void>;
  },
);

type AuthProviderProps = {
  children: React.ReactNode;
};
function AuthProvider({ children }: AuthProviderProps) {
  const isUserFirst = useIsUserFirstQuery();
  const userProfile = useGetProfileQuery();
  const [login] = useLoginMutation();

  return (
    <authContext.Provider
      value={{
        isUserFirst: isUserFirst.data ?? false,
        user: userProfile.data ?? null,
        isLoading: userProfile.isLoading,
        login: async (userData) => {
          login(userData).then((res) => {
            console.log('res', res);
          });
        },
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
