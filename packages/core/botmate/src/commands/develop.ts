'use strict';

import path from 'path';
import cluster from 'cluster';
import fs from 'fs-extra';
import chokidar from 'chokidar';
import execa from 'execa';
import { getOr } from 'lodash/fp';
import { joinBy } from '@botmate/utils/lib/string-formatting';
import tsUtils from '@botmate/typescript-utils';
import botmate from '../index';

import loadConfiguration from '../core/app-configuration';
import { buildTypeScript, buildAdmin } from './builders';

/**
 * `$ botmate develop`
 *
 */

export default async ({ build, watchAdmin, polling, browser }) => {
  const appDir = process.cwd();

  const isTSProject = await tsUtils.isUsingTypeScript(appDir);
  const outDir = await tsUtils.resolveOutDir(appDir);
  const distDir = isTSProject ? outDir : appDir;

  try {
    if (cluster.isMaster || cluster.isPrimary) {
      return primaryProcess({
        distDir,
        appDir,
        build,
        browser,
        isTSProject,
        watchAdmin,
      });
    }

    if (cluster.isWorker) {
      return workerProcess({
        appDir,
        distDir,
        watchAdmin,
        polling,
        isTSProject,
      });
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

const primaryProcess = async ({ distDir, appDir, build, isTSProject, watchAdmin, browser }) => {
  if (isTSProject) {
    await buildTypeScript({ srcDir: appDir, distDir, watch: false });
  }

  const config = loadConfiguration({ appDir, distDir });
  const serveAdminPanel = getOr(true, 'admin.serveAdminPanel') as Function;
  serveAdminPanel(config);

  const buildExists = fs.existsSync(path.join(distDir, 'build'));

  // Don't run the build process if the admin is in watch mode
  if (build && !watchAdmin && serveAdminPanel && !buildExists) {
    try {
      await buildAdmin({
        buildDestDir: distDir,
        forceBuild: false,
        optimization: false,
        srcDir: appDir,
      });
    } catch (err) {
      console.log('err', err);
      process.exit(1);
    }
  }

  if (watchAdmin) {
    try {
      execa('npm', ['run', '-s', 'botmate', 'watch-admin', '--', '--browser', browser], {
        stdio: 'inherit',
      });
    } catch (err) {
      process.exit(1);
    }
  }

  cluster.on('message', async (worker, message) => {
    switch (message) {
      case 'reload':
        if (isTSProject) {
          await buildTypeScript({ srcDir: appDir, distDir, watch: false });
        }

        console.info('The server is restarting\n');

        worker.send('kill');
        break;
      case 'killed':
        cluster.fork();
        break;
      case 'stop':
        process.exit(1);
        break;
      default: {
        break;
      }
    }
  });

  cluster.fork();
};

const workerProcess = ({ appDir, distDir, watchAdmin, polling, isTSProject }) => {
  const botmateInstance = botmate({
    distDir,
    autoReload: true,
    serveAdminPanel: !watchAdmin,
  });

  const adminWatchIgnoreFiles = botmateInstance.config.get('admin.watchIgnoreFiles', []);
  watchFileChanges({
    appDir,
    botmateInstance,
    watchIgnoreFiles: adminWatchIgnoreFiles,
    polling,
  });

  process.on('message', async (message) => {
    switch (message) {
      case 'kill': {
        await botmateInstance.destroy();
        process.send('killed');
        process.exit();
        break;
      }
      default: {
        break;
      }
      // Do nothing.
    }
  });

  return botmateInstance.start();
};

/**
 * Init file watching to auto restart botmate app
 * @param {Object} options - Options object
 * @param {string} options.appDir - This is the path where the app is located, the watcher will watch the files under this folder
 * @param {botmate} options.botmate - botmate instance
 * @param {array} options.watchIgnoreFiles - Array of custom file paths that should not be watched
 */
function watchFileChanges({
  appDir,
  botmateInstance,
  watchIgnoreFiles,
  polling,
}: {
  appDir: string;
  botmateInstance: BotMate.BotMateInstance;
  watchIgnoreFiles: string[];
  polling: boolean;
}) {
  const restart = async () => {
    const r = botmateInstance.reload();
    if (r.isWatching && !r.isReloading) {
      r.isReloading = true;
    }
  };

  const watcher = chokidar.watch(appDir, {
    ignoreInitial: true,
    usePolling: polling,
    ignored: [
      /(^|[/\\])\../, // dot files
      /tmp/,
      '**/src/admin/**',
      '**/src/plugins/**/admin/**',
      '**/dist/src/plugins/test/admin/**',
      '**/documentation',
      '**/documentation/**',
      '**/node_modules',
      '**/node_modules/**',
      '**/plugins.json',
      '**/build',
      '**/build/**',
      '**/index.html',
      '**/public',
      '**/public/**',
      botmateInstance.dirs.static.public,
      joinBy('/', botmateInstance.dirs.static.public, '**'),
      '**/*.db*',
      '**/exports/**',
      '**/dist/**',
      ...watchIgnoreFiles,
    ],
  });

  watcher
    .on('add', (path) => {
      botmateInstance.log.info(`File created: ${path}`);
      restart();
    })
    .on('change', (path) => {
      botmateInstance.log.info(`File changed: ${path}`);
      restart();
    })
    .on('unlink', (path) => {
      botmateInstance.log.info(`File deleted: ${path}`);
      restart();
    });
}
