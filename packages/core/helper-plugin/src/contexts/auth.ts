import { createContext } from 'react';
import { IUser } from '@botmate/types/server';

const authContext = createContext(
  {} as {
    isLoading: boolean;
    user: IUser | null;
  }
);

export { authContext };
