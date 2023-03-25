'use strict';

import path from 'path';
import fs from 'fs-extra';
import getCustomAppConfigFile from './get-custom-app-config-file';

const DEFAULT_PLUGINS = [];

/**
 * Checks if the project's installed plugins are not the same as a default one.
 */
const hasNonDefaultPlugins = (plugins) => {
  // List of plugins that are not the ones installed in a generated app
  const installedPlugins = Object.keys(plugins).filter((x) => !DEFAULT_PLUGINS.includes(x));

  // List of default plugins uninstalled from a generated app
  const missingPlugins = DEFAULT_PLUGINS.filter((x) => !Object.keys(plugins).includes(x));

  const diff = [...installedPlugins, ...missingPlugins];

  return diff.length > 0;
};

const hasCustomAdminCode = async (dir: string) => {
  const customAdminPath = path.join(dir, 'src', 'admin');

  const customAdminAppConfigFile = await getCustomAppConfigFile(dir);
  const customAdminWebpackFile = path.join(customAdminPath, 'webpack.config.js');

  const hasCustomConfigFile = !!customAdminAppConfigFile;
  const hasCustomWebpackFile = await fs.pathExists(customAdminWebpackFile);

  return hasCustomConfigFile || hasCustomWebpackFile;
};

const shouldBuildAdmin = async ({ appDir, plugins }) => {
  const appHasCustomAdminCode = await hasCustomAdminCode(appDir);
  const appHasNonDefaultPlugins = hasNonDefaultPlugins(plugins);

  return appHasCustomAdminCode || appHasNonDefaultPlugins;
};

export default shouldBuildAdmin;
