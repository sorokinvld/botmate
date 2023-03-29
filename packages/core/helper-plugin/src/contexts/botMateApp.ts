import { createContext } from 'react';
import { BotMateAppProviderProps } from '../providers/botMateApp';

const botMateAppContext = createContext({} as BotMateAppProviderProps);

export { botMateAppContext };
