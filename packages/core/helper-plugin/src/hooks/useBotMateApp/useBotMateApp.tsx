import { useContext } from 'react';
import { botMateAppContext } from '../../contexts/botMateApp';

export const useBotMateApp = () => {
  const context = useContext(botMateAppContext);
  return context;
};
