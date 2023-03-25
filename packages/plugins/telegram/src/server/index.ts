import { Bot } from 'grammy';
import register from './register';

export default () => ({
  register: async ({ botmate }) => {
    const botsRegistry = botmate.container.get('bots');
    const bots = botmate.bots.filter((bot) => bot.platform === 'telegram');

    for (const botData of bots) {
      const bot = new Bot(botData.token);
      await bot.init();
      bot.start();
      console.log(bot.botInfo.id);
      botsRegistry.add({ id: bot.botInfo.id, instance: bot });
    }

    console.log('returning');
    return true;
  },
});
