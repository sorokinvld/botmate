'use strict';

const path = require('path');
const findRoot = require('find-root');

const aliasExactMatch = ['react', 'react-dom', 'react-router-dom', '@xstyled/styled-components'];

module.exports = {
  ...aliasExactMatch.reduce((acc, moduleName) => {
    acc[`${moduleName}$`] = findRoot(require.resolve(moduleName));
    return acc;
  }, {}),

  ee_else_ce: path.resolve(__dirname),
};
