import { Bot } from 'grammy';

const services = {
  bot: ({ botmate }: { botmate }) => ({
    create: async ({ token }) => {
      try {
        const bot = new Bot(token);
        await bot.init();

        return {
          id: bot.botInfo.id.toString(),
          name: bot.botInfo.first_name,
          platform: 'telegram',
          secrets: {
            token,
          },
          info: bot.botInfo,
        };
      } catch (e) {
        throw new Error(`Failed to create Telegram bot: ${e.message}`);
      }
    },
  }),
};

export default services;
