import { BotMate } from '@botmate/core/lib/BotMate';
import grammy from '@botmate/plugin.telegram';

function bootstrap({ botmate }: { botmate: BotMate }) {
  console.log('botmate', botmate.hooks());
  // const botsRegistry = botmate.container.get('bots');
  // const bots = botsRegistry.getAll();
  // bots.forEach(({ instance }) => {
  //   instance.command('hello', (ctx) => ctx.reply('Hello World!'));
  // });
  // setTimeout(() => {
  //   console.log('bots', bots);
  // }, 2000);
}

export default bootstrap;
