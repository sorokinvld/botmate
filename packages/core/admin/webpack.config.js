'use strict';

const path = require('path');
const fse = require('fs-extra');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const browserslistToEsbuild = require('browserslist-to-esbuild');
const findRoot = require('find-root');

const alias = require('./webpack.alias');
const getClientEnvironment = require('./env');
const createPluginsExcludePath = require('./lib/utils/create-plugins-exclude-path');

module.exports = ({
  cacheDir,
  dest,
  entry,
  env,
  optimize,
  pluginsPath,
  options = {
    backend: 'http://localhost:9732',
    adminPath: '/admin/',
    features: [],
  },
  tsConfigFilePath,
}) => {
  const isProduction = env === 'production';

  const envVariables = getClientEnvironment({ ...options, env });

  const webpackPlugins = isProduction
    ? [
        new MiniCssExtractPlugin({
          filename: '[name].[chunkhash].css',
          chunkFilename: '[name].[chunkhash].chunkhash.css',
          ignoreOrder: true,
        }),
        new WebpackBar(),
      ]
    : [];

  const excludeRegex = createPluginsExcludePath(pluginsPath);

  const buildTarget = browserslistToEsbuild();

  return {
    mode: isProduction ? 'production' : 'development',
    bail: !!isProduction,
    devtool: isProduction ? false : 'eval-source-map',
    experiments: {
      topLevelAwait: true,
    },
    entry: entry,
    output: {
      path: dest,
      publicPath: options.adminPath,
      // Utilize long-term caching by adding content hashes (not compilation hashes)
      // to compiled assets for production
      filename: isProduction ? '[name].[contenthash:8].js' : '[name].bundle.js',
      chunkFilename: isProduction ? '[name].[contenthash:8].chunk.js' : '[name].chunk.js',
    },
    optimization: {
      minimize: optimize,
      minimizer: [],
      moduleIds: 'deterministic',
      runtimeChunk: true,
    },
    module: {
      rules: [
        {
          test: /\.[jt]sx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: require.resolve('swc-loader'),
              options: {
                jsc: {
                  transform: {
                    react: {
                      development: !isProduction,
                      refresh: !isProduction,
                    },
                  },
                },
              },
            },
          ],
        },

        /**
         * This is used to avoid webpack import errors where
         * the origin is strict EcmaScript Module.
         *
         * e. g. a module with javascript mimetype, a '.mjs' file,
         * or a '.js' file where the package.json contains '"type": "module"'
         */
        {
          test: /\.m?jsx?$/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(svg|eot|otf|ttf|woff|woff2)$/,
          type: 'asset/resource',
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.ico$/],
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 1000,
            },
          },
        },
        {
          test: /\.html$/,
          include: [path.join(__dirname, 'src')],
          use: require.resolve('html-loader'),
        },
        {
          test: /\.(mp4|webm)$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 10000,
            },
          },
        },
      ],
    },
    resolve: {
      alias: {
        ...alias,
        ...(!isProduction
          ? {
              // load the source code of the shared ui package in dev mode
              '@botmate/ui$': path.resolve(__dirname, '..', '..', 'shared', 'ui', 'src'),
            }
          : {}),
      },
      symlinks: false,
      extensions: ['.js', '.jsx', '.react.js', '.ts', '.tsx'],
      mainFields: ['browser', 'jsnext:main', 'main'],
      modules: ['node_modules', path.resolve(__dirname, 'node_modules')],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, 'index.html'),
      }),
      new webpack.DefinePlugin(envVariables),

      tsConfigFilePath
        ? new ForkTsCheckerPlugin({
            typescript: {
              configFile: tsConfigFilePath,
            },
          })
        : false,

      !isProduction && process.env.REACT_REFRESH !== 'false' && new ReactRefreshWebpackPlugin(),

      ...webpackPlugins,
    ].filter(Boolean),
  };
};
