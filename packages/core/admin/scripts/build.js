const path = require('path');
const webpack = require('webpack');
const { isObject } = require('lodash');

const webpackConfig = require('../webpack.config');

const {
  getCorePluginsPath,
  getPluginToInstallPath,
  createPluginsFile,
} = require('./create-plugins-file');
const getPluginsPath = require('../utils/get-plugins-path');

const PLUGINS_TO_INSTALL = [];

const buildAdmin = async () => {
  const entry = path.join(__dirname, '..', 'admin', 'src');
  const dest = path.join(__dirname, '..', 'build');
  // const tsConfigFilePath = path.join(__dirname, '..', 'admin', 'src', 'tsconfig.json');

  const corePlugins = getCorePluginsPath();
  const plugins = getPluginToInstallPath(PLUGINS_TO_INSTALL);
  const allPlugins = { ...corePlugins, ...plugins };
  const pluginsPath = getPluginsPath();

  await createPluginsFile(allPlugins);

  // const args = {
  //   entry,
  //   dest,
  //   cacheDir: path.join(__dirname, '..'),
  //   pluginsPath,
  //   env: 'production',
  //   optimize: true,
  //   options: {
  //     backend: 'http://localhost:9732',
  //     adminPath: '',
  //   },
  //   tsConfigFilePath,
  // };

  // const config = webpackConfig(args);

  // const compiler = webpack(config);

  // console.log('Building the admin panel');

  // return new Promise((resolve, reject) => {
  //   compiler.run((err, stats) => {
  //     let messages;
  //     if (err) {
  //       if (!err.message) {
  //         return reject(err);
  //       }
  //       messages = {
  //         errors: [err.message],
  //         warnings: [],
  //       };
  //     } else {
  //       messages = stats.toJson({ all: false, warnings: true, errors: true });
  //     }

  //     if (messages.errors.length) {
  //       // Only keep the first error. Others are often indicative
  //       // of the same problem, but confuse the reader with noise.
  //       if (messages.errors.length > 1) {
  //         messages.errors.length = 1;
  //       }

  //       return reject(
  //         new Error(
  //           messages.errors.reduce((acc, error) => {
  //             if (isObject(error)) {
  //               return acc + error.message;
  //             }

  //             return acc + error.join('\n\n');
  //           }, '')
  //         )
  //       );
  //     }

  //     return resolve({
  //       stats,
  //       warnings: messages.warnings,
  //     });
  //   });
  // });
};

buildAdmin()
  .then(() => {
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
