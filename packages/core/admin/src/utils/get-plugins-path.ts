'use strict';

import { join, resolve, sep, posix } from 'path';
import fs from 'fs-extra';
import glob from 'glob';

// Only for dev environement
const getPluginsPath = () => {
  const rootPath = resolve(__dirname, '..', join('..', '..', '..'));
  let corePath = join(rootPath, 'core', '*');
  let pluginsPath = join(rootPath, 'plugins', '*');

  if (process.platform === 'win32') {
    corePath = corePath.split(sep).join(posix.sep);
    pluginsPath = pluginsPath.split(sep).join(posix.sep);
  }

  const corePackageDirs = glob.sync(corePath);
  const pluginsPackageDirs = glob.sync(pluginsPath);

  const packageDirs = [...corePackageDirs, ...pluginsPackageDirs].filter((dir) => {
    const isCoreAdmin = dir.includes('packages/core/admin');
    const pathToEntryPoint = join(dir, 'admin', 'src', 'index.tsx');
    const doesAdminFolderExist = fs.pathExistsSync(pathToEntryPoint);

    return !isCoreAdmin && doesAdminFolderExist;
  });

  return packageDirs.map((dir) => resolve(__dirname, '..', join(dir, 'admin', 'src')));
};

export default getPluginsPath;
