import Telegram from '@botmate/plugin.telegram';
import { BotMate } from '@botmate/core/lib/BotMate';

function register({ botmate }: { botmate: BotMate }) {
  console.log('Hello from my plugin!');
}

export default register;
