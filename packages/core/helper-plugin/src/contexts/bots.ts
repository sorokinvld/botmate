import { createContext } from 'react';
import { IBot } from '@botmate/types/server';

const botsContext = createContext(
  {} as {
    bots: IBot[];
    activeBot: IBot | null;
    setActiveBot: (bot: IBot | null) => void;
    isLoading: boolean;
  }
);

export { botsContext };
