'use strict';

import path from 'path';
import chalk from 'chalk';
import _ from 'lodash';
import webpack from 'webpack';
import fs from 'fs-extra';

const getCustomWebpackConfig = (dir: string, config: any) => {
  const adminConfigPath = path.join(dir, 'src', 'admin', 'webpack.config.js');
  const getWebpackConfig = require(path.resolve(__dirname, '..', '..', 'webpack.config.js'));

  let webpackConfig = getWebpackConfig(config);

  if (fs.existsSync(adminConfigPath)) {
    const webpackAdminConfig = require(path.resolve(adminConfigPath));

    if (_.isFunction(webpackAdminConfig)) {
      // Expose the devServer configuration
      if (config.devServer) {
        webpackConfig.devServer = config.devServer;
      }

      webpackConfig = webpackAdminConfig(webpackConfig, webpack);

      if (!webpackConfig) {
        console.error(
          `${chalk.red('Error:')} Nothing was returned from your custom webpack configuration`
        );
        process.exit(1);
      }
    }
  }

  return webpackConfig;
};

export default getCustomWebpackConfig;
