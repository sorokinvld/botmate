'use strict';

import findRoot from 'find-root';

const aliasExactMatch = [
  'react',
  'react-dom',
  'react-router-dom',
  'react-apexcharts',
  '@botmate/ui',
  '@chakra-ui/react',
  '@botmate/helper-plugin',
  'react-icons',
  '@loadable/component',
];

const alias = {
  ...aliasExactMatch.reduce((acc, moduleName) => {
    acc[`${moduleName}`] = findRoot(require.resolve(moduleName));
    return acc;
  }, {}),
};

function getAlias() {
  return alias;
}

export { getAlias };
