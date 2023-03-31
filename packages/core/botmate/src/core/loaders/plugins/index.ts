'use strict';

import { join } from 'path';
import fse from 'fs-extra';
import { defaultsDeep } from 'lodash/fp';
import loadConfigFile from '../../app-configuration/load-config-file';
import getEnabledPlugins from './get-enabled-plugins';

const defaultPlugin = {
  bootstrap() {},
  destroy() {},
  register() {},
  services: {},
  config: {
    default: {},
    validator() {},
  },
};

const loadPlugins = async (botmate: BotMate.BotMateInstance) => {
  const plugins = {};

  const enabledPlugins = await getEnabledPlugins(botmate);

  botmate.config.set('enabledPlugins', enabledPlugins);

  for (const pluginName of Object.keys(enabledPlugins)) {
    const enabledPlugin = enabledPlugins[pluginName];

    let serverEntrypointPath;

    try {
      serverEntrypointPath = join(enabledPlugin.pathToPlugin, 'botmate-server.js');
    } catch (e) {
      throw new Error(
        `Error loading the plugin ${pluginName} because ${pluginName} is not installed. Please either install the plugin or remove it's configuration.`
      );
    }

    // only load plugins with a server entrypoint
    if (!(await fse.pathExists(serverEntrypointPath))) {
      continue;
    }

    const pluginServer = loadConfigFile(serverEntrypointPath);
    plugins[pluginName] = defaultsDeep(defaultPlugin, pluginServer);
  }

  for (const pluginName of Object.keys(plugins)) {
    botmate.container.get('plugins').add(pluginName, plugins[pluginName]);
  }
};

export default loadPlugins;
