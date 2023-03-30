import path from 'path';
import fs from 'fs-extra';
import { build as viteBuild } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { getAlias } from './alias';
import EnvironmentPlugin from 'vite-plugin-environment';

import { createCacheDir } from './utils';

const clean = ({ appDir, buildDestDir }) => {
  const buildDir = path.join(buildDestDir, 'build');
  const cacheDir = path.join(appDir, '.cache');

  fs.removeSync(buildDir);
  fs.removeSync(cacheDir);
};

const build = async ({ appDir, buildDestDir, env, forceBuild, optimize, options, plugins }) => {
  await createCacheDir({ appDir, plugins });
  const cacheDir = path.resolve(appDir, '.cache');
  const entry = path.resolve(cacheDir, 'admin', 'src');
  const alias = getAlias();

  viteBuild({
    root: entry,
    build: {
      outDir: path.resolve(buildDestDir, 'build'),
    },
    plugins: [
      react(),
      EnvironmentPlugin({
        NODE_ENV: 'production',
        BACKEND: options.backend,
      }),
    ],
    resolve: {
      alias,
    },
  }).then(() => {
    console.log('Vite build finished');
  });
};

async function watchAdmin({ appDir, browser, buildDestDir, host, options, plugins, port }) {}

export { clean, build, watchAdmin };
