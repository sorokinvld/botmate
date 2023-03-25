'use strict';

import { dirname, join, resolve } from 'path';
import { statSync, existsSync } from 'fs';
import _ from 'lodash';
import { get, has, pick, pickBy, defaultsDeep, map, prop, pipe } from 'lodash/fp';
import { isKebabCase } from '@botmate/utils/lib/string-formatting';
import getUserPluginsConfig from './get-user-plugins-config';

const isBotMatePlugin = (info: string) => get('botmate.kind', info) === 'plugin';
const INTERNAL_PLUGINS = [];

const validatePluginName = (pluginName: string) => {
  if (!isKebabCase(pluginName)) {
    throw new Error(`Plugin name "${pluginName}" is not in kebab (an-example-of-kebab-case)`);
  }
};

const toDetailedDeclaration = (declaration: any) => {
  if (typeof declaration === 'boolean') {
    return { enabled: declaration };
  }

  const detailedDeclaration = pick(['enabled'], declaration);
  if (has('resolve', declaration)) {
    let pathToPlugin = '';

    try {
      pathToPlugin = dirname(require.resolve(declaration.resolve));
    } catch (e) {
      pathToPlugin = resolve(botmate.dirs.app.root, declaration.resolve);

      if (!existsSync(pathToPlugin) || !statSync(pathToPlugin).isDirectory()) {
        throw new Error(`${declaration.resolve} couldn't be resolved`);
      }
    }

    Object.assign(detailedDeclaration, { pathToPlugin });
  }
  return detailedDeclaration;
};

const getEnabledPlugins = async (botmate: BotMate.BotMateInstance) => {
  const internalPlugins = {};
  for (const dep of INTERNAL_PLUGINS) {
    const packagePath = join(dep, 'package.json');
    const packageInfo = require(packagePath);

    validatePluginName(packageInfo.botmate.name);
    internalPlugins[packageInfo.botmate.name] = {
      ...toDetailedDeclaration({ enabled: true, resolve: packagePath }),
      info: packageInfo.botmate,
    };
  }

  const installedPlugins = {};
  const dependencies = botmate.config.get('info.dependencies', {});

  for (const dep of Object.keys(dependencies)) {
    const packagePath = join(dep, 'package.json');
    let packageInfo;
    try {
      packageInfo = require(packagePath);
    } catch {
      continue;
    }

    if (isBotMatePlugin(packageInfo)) {
      validatePluginName(packageInfo.botmate.name);
      installedPlugins[packageInfo.botmate.name] = {
        ...toDetailedDeclaration({ enabled: true, resolve: packagePath }),
        info: {
          ...packageInfo.botmate,
          packageName: packageInfo.name,
        },
      };
    }
  }

  const declaredPlugins = {};
  const userPluginsConfig = await getUserPluginsConfig();

  _.forEach(userPluginsConfig, (declaration, pluginName) => {
    validatePluginName(pluginName);

    declaredPlugins[pluginName] = {
      ...toDetailedDeclaration(declaration),
      info: {},
    };

    const { pathToPlugin } = declaredPlugins[pluginName];

    // for manually resolved plugins
    if (pathToPlugin) {
      const packagePath = join(pathToPlugin, 'package.json');
      const packageInfo = require(packagePath);

      if (isBotMatePlugin(packageInfo)) {
        declaredPlugins[pluginName].info = packageInfo.botmate || {};
      }
    }
  });

  const declaredPluginsResolves = map(prop('pathToPlugin'), declaredPlugins);
  const installedPluginsNotAlreadyUsed = pickBy(
    (p: any) => !declaredPluginsResolves.includes(p.pathToPlugin),
    installedPlugins
  );

  const enabledPlugins = pipe(
    defaultsDeep(declaredPlugins),
    defaultsDeep(installedPluginsNotAlreadyUsed),
    pickBy((p: any) => p.enabled)
  )(internalPlugins);

  return enabledPlugins;
};

export default getEnabledPlugins;
