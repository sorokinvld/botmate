import { Bot } from '@api';
import { RootState } from '@store';
import { useSelector } from 'react-redux';

export const useActiveBot = () => {
  const bot = useSelector((state: RootState) => state.bot.activeBot);
  return bot as Bot;
};
