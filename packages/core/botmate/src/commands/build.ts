'use strict';

import botmate from '..';
import { buildAdmin } from './builders';
import compile from '../compile';

/**
 * `$ botmate build`
 */
module.exports = async ({ optimization, forceBuild = true }) => {
  const { appDir, distDir } = await compile();

  await buildAdmin({
    forceBuild,
    optimization,
    buildDestDir: distDir,
    srcDir: appDir,
  });
};
