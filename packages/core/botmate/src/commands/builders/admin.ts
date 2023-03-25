'use strict';

import { green } from 'chalk';

import * as botmateAdmin from '@botmate/admin';
import { getConfigUrls } from '@botmate/utils';

import addSlash from '../../utils/add-slash';
import botmate from '../../BotMate';
import getEnabledPlugins from '../../core/loaders/plugins/get-enabled-plugins';

export default async ({ buildDestDir, forceBuild = true, optimization, srcDir }) => {
  const botmateInstance = botmate({
    // Directories
    appDir: srcDir,
    distDir: buildDestDir,
    // Options
    autoReload: true,
    serveAdminPanel: false,
  });

  const plugins = await getEnabledPlugins(botmateInstance);

  const env = botmateInstance.config.get('environment');
  const { serverUrl, adminPath } = getConfigUrls(botmateInstance.config, true);

  console.log(`Building your admin UI with ${green(env)} configuration...`);

  // Always remove the .cache and build folders
  botmateAdmin.clean({ appDir: srcDir, buildDestDir });

  return botmateAdmin
    .build({
      appDir: srcDir,
      buildDestDir,
      // front end build env is always production for now
      env: 'production',
      forceBuild,
      plugins,
      optimize: optimization,
      options: {
        backend: serverUrl,
        adminPath: addSlash(adminPath),
      },
    })
    .then(() => {
      console.log('Admin UI built successfully');
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
};
