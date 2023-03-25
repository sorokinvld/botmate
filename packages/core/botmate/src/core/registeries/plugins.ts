'use strict';

import { has } from 'lodash/fp';

const pluginsRegistry = (botmate) => {
  const plugins = {};

  return {
    get(name) {
      return plugins[name];
    },
    getAll() {
      return plugins;
    },
    add(name, pluginConfig) {
      if (has(name, plugins)) {
        throw new Error(`Plugin ${name} has already been registered.`);
      }

      const modules = botmate.container.get('modules');
      const pluginModule = modules.add(`plugin::${name}`, pluginConfig);
      plugins[name] = pluginModule;

      return plugins[name];
    },
  };
};

export default pluginsRegistry;
