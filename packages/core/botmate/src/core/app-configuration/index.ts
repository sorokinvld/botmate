'use strict';

import dotenv from 'dotenv';
import os from 'os';
import path from 'path';
import _ from 'lodash';
import { omit } from 'lodash/fp';
import loadConfigDir from './config-loader';

dotenv.config({ path: process.env.ENV_PATH });

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const { version: botmateVersion } = require(path.join(__dirname, '../../../package.json'));

const defaultConfig = {
  server: {
    host: process.env.HOST || os.hostname() || 'localhost',
    port: process.env.PORT || 4356,
    proxy: false,
    cron: { enabled: false },
    admin: { autoOpen: false },
    dirs: { public: './public' },
  },
  admin: {},
  api: {
    rest: {
      prefix: '/api',
    },
  },
};

export default (dirs: any, initialConfig: any = {}) => {
  const { appDir, distDir } = dirs;
  const { autoReload = false, serveAdminPanel = true } = initialConfig;

  const pkgJSON = require(path.resolve(appDir, 'package.json'));

  const configDir = path.resolve(distDir || process.cwd(), 'config');

  const rootConfig = {
    launchedAt: Date.now(),
    serveAdminPanel,
    autoReload,
    environment: process.env.NODE_ENV,
    uuid: _.get(pkgJSON, 'botmate.uuid'),
    packageJsonbotmate: _.omit(_.get(pkgJSON, 'botmate', {}), 'uuid'),
    info: {
      ...pkgJSON,
      botmate: botmateVersion,
    },
  };

  const baseConfig = omit('plugins', loadConfigDir(configDir)); // plugin config will be loaded later

  const envDir = path.resolve(configDir, 'env', process.env.NODE_ENV);
  const envConfig = loadConfigDir(envDir);

  return _.merge(rootConfig, defaultConfig, baseConfig, envConfig);
};
