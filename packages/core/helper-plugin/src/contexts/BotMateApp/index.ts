import { createContext } from 'react';
import { BotMateAppProviderProps } from '../../providers/BotMateApp';

const botMateAppContext = createContext({} as BotMateAppProviderProps);

export { botMateAppContext };
