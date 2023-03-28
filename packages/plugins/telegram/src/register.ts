import { BotMate } from '@botmate/core/lib/BotMate';
import { createComposers } from './composers';

export default ({ botmate }: { botmate: BotMate }) => {
  botmate.container.get('hooks').set('telegram::composers', createComposers());
};
