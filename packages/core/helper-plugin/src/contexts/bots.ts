import { createContext } from 'react';
import { BotProviderProps } from '../providers/bots';

const botsContext = createContext({} as BotProviderProps);

export { botsContext };
