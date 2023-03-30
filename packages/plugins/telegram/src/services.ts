import { Bot } from 'grammy';
import { createDebug } from '@botmate/utils';

const debug = createDebug('plugin:telegram:services');

const instances = new Map();

const services = {
  bot: ({ botmate }) => ({
    start: ({ bot: botData }) => {
      const bot = new Bot(botData.secrets.token);
      bot.command('start', (ctx) => {
        ctx.reply('I am working!!');
      });

      instances.set(botData.id, bot);
      bot.start().catch((err) => {
        instances.delete(botData.id);

        debug('Telegram bot error: %s', err.message);
        botmate.eventHub.emit('bot.error', {
          bot: botData,
          error: err,
        });
      });
    },
    stop: ({ bot: botData }) => {
      const bot = instances.get(botData.id);
      if (bot) {
        bot.stop();
        instances.delete(botData.id);
      }
    },
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
