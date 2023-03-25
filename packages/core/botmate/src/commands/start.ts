'use strict';

import fs from 'fs';
import tsUtils from '@botmate/typescript-utils';
import botmate from '../index';

/**
 * `$ botmate start`
 */
module.exports = async () => {
  const appDir = process.cwd();

  const isTSProject = await tsUtils.isUsingTypeScript(appDir);

  const outDir = await tsUtils.resolveOutDir(appDir);
  const distDir = isTSProject ? outDir : appDir;

  const buildDirExists = fs.existsSync(outDir);
  if (isTSProject && !buildDirExists)
    throw new Error(
      `${outDir} directory not found. Please run the build command before starting your application`
    );

  return botmate({ appDir, distDir }).start();
};
