'use strict';

import { has } from 'lodash/fp';

const platformsRegistery = (botmate) => {
  const platforms = new Map();

  return {
    get(name) {
      return platforms.get(name);
    },
    getAll() {
      return platforms;
    },
    add(name, handler) {
      if (has(name, platforms)) {
        throw new Error(`platform ${name} has already been registered.`);
      }

      const modules = botmate.container.get('modules');
      const platformModule = modules.add(`platform::${name}`, handler);
      platforms.set(name, platformModule);

      return platformModule;
    },
  };
};

export default platformsRegistery;
