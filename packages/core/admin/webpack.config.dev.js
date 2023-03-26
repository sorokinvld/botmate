'use strict';

const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { DuplicateReporterPlugin } = require('duplicate-dependencies-webpack-plugin');
const getPluginsPath = require('./lib/utils/get-plugins-path');
const webpackConfig = require('./webpack.config');

module.exports = () => {
  const analyzeBundle = process.env.ANALYZE_BUNDLE;
  const analyzeDuplicateDependencies = process.env.ANALYZE_DEPS;
  const adminPath = path.join(__dirname, 'admin', 'src');

  const dest = path.join(__dirname, 'build');

  // When running the analyze:bundle command, it needs a production build
  // to display the tree map of modules
  const env = analyzeBundle ? 'production' : 'development';
  const options = {
    backend: 'http://localhost:9732',
    adminPath: '/',
  };
  const pluginsPath = getPluginsPath.default();

  const args = {
    entry: [adminPath],
    cacheDir: __dirname,
    pluginsPath,
    dest,
    env,
    options,
    tsConfigFilePath: path.resolve(__dirname, 'admin', 'src', 'tsconfig.json'),
  };

  const config = webpackConfig(args);

  if (analyzeBundle) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  if (analyzeDuplicateDependencies === 'true') {
    config.plugins.push(new DuplicateReporterPlugin());
  }

  /**
   * @type {import('webpack').Configuration}
   */
  const cnf = {
    ...config,

    devServer: {
      port: 4000,
      client: {
        logging: 'log',
        overlay: {
          errors: true,
          warnings: false,
        },
      },
      static: {
        directory: path.join(__dirname, './'),
        serveIndex: true,
      },
      historyApiFallback: {
        index: '/',
        disableDotRule: true,
      },
    },
  };

  return cnf;
};
