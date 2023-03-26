import { Bot } from 'grammy';

export default async ({ botmate }) => {
  const botsRegistry = botmate.container.get('bots');
  const bots = botmate.bots.filter((bot) => bot.platform === 'telegram');

  for (const botData of bots) {
    const bot = new Bot(botData.token);
    await bot.init();
    bot.start();
    botsRegistry.add({ id: bot.botInfo.id, instance: bot });
  }

  return true;
};
