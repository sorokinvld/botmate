import grammy from '@botmate/plugin.telegram';

function setup({ botmate }) {
  const botsRegistry = botmate.container.get('bots');
  const bots = botsRegistry.getAll();

  bots.forEach(({ instance }) => {
    instance.command('hello', (ctx) => ctx.reply('Hello World!'));
  });

  // setTimeout(() => {
  //   console.log('bots', bots);
  // }, 2000);
}

export default setup;
