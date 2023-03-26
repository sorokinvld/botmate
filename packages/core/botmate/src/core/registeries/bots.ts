'use strict';

import _ from 'lodash';

function botsRegistry() {
  const bots = [];

  return {
    add(bot: any) {
      if (!bot) {
        throw new Error('Bot is required');
      }

      bots.push(bot);
    },
    get(id: string | number) {
      return _.find(bots, (bot) => bot.id === id);
    },
    getAll(): any[] {
      return bots;
    },
  };
}

export default botsRegistry;
