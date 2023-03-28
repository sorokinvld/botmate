import { Bot } from '../../models';

async function loadBots(botmate: BotMate.BotMateInstance) {
  const bots = await Bot.find({});
  console.log('bots', bots);
  botmate.container.get('bots').add(bots);
  return true;
}

export default loadBots;
