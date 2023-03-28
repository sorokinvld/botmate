'use strict';

import _ from 'lodash';
import { BotSchema } from '@botmate/schemas';

type IBot = typeof BotSchema;

function botsRegistry(botmate: BotMate.BotMateInstance) {
  const bots: IBot[] = [];

  return {
    get(id: string) {
      return _.find(bots, { id });
    },
    getAll() {
      return bots;
    },
    add(bot: IBot | IBot[]) {
      if (Array.isArray(bot)) {
        bots.push(...bot);
      } else {
        bots.push(bot);
      }
    },
  };
}

export default botsRegistry;
