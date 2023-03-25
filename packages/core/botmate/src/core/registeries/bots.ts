'use strict';

const _ = require('lodash');

export default (botmate) => {
  const bots = [];

  return {
    add(bot) {
      // todo: validate bot {id, instance etc ...}

      if (!bot) {
        throw new Error('Bot is required');
      }

      bots.push(bot);
    },
    get(id) {
      return _.find(bots, (bot) => bot.id === id);
    },
    getAll() {
      return bots;
    },
    start(path, val) {},
    stop(id) {},
  };
};
