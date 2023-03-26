'use strict';

const path = require('path');
const findRoot = require('find-root');

const aliasExactMatch = [
  'react',
  'react-dom',
  'react-router-dom',
  '@botmate/ui',
  '@chakra-ui/react',
];

const alias = {
  ...aliasExactMatch.reduce((acc, moduleName) => {
    acc[`${moduleName}$`] = findRoot(require.resolve(moduleName));
    return acc;
  }, {}),
};

module.exports = alias;
