import { Bot } from '../../models/bot';

export const services = (botmate: BotMate.BotMateInstance) => ({
  findBots: () => {
    return Bot.find();
  },
});
