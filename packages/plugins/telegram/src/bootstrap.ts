import { BotMate } from '@botmate/types/server';

function bootstrap({ botmate }: { botmate: BotMate }) {
  console.log(botmate.bots);
}

export default bootstrap;
