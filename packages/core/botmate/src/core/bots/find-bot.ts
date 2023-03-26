import { Bot } from '../../models/bot';

export const findBots = () => {
  return Bot.find();
};
