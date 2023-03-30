import path from 'path';
import { isFunction } from 'lodash';
import { createLogger } from '@botmate/logger';
import { initDb } from '@botmate/database';
import mongoose from 'mongoose';
import EventEmitter2 from 'eventemitter2';

import loadConfiguration from './core/app-configuration';
import createConfigProvider from './core/registeries/config';
import pluginsRegistry from './core/registeries/plugins';
import modulesRegistry from './core/registeries/modules';
import hooksRegistry from './core/registeries/hooks';
import servicesRegistry from './core/registeries/services';

import { createContainer } from './container';
import * as utils from './utils';
import * as loaders from './core/loaders';
import LIFECYCLES from './utils/lifecycles';
import { createServer } from './server';
import controllersRegistry from './core/registeries/controllers';

const resolveWorkingDirectories = (opts: { appDir?: any; distDir?: any }) => {
  const cwd = process.cwd();

  const appDir = opts.appDir ? path.resolve(cwd, opts.appDir) : cwd;
  const distDir = opts.distDir ? path.resolve(cwd, opts.distDir) : appDir;

  return { app: appDir, dist: distDir };
};

class BotMate {
  container: any;
  dirs: any;
  server: any;
  isLoaded: boolean;
  app: any;
  admin: any;
  db: typeof mongoose;
  log: ReturnType<typeof createLogger>;
  eventHub: EventEmitter2;

  constructor(opts = {}) {
    const rootDirs = resolveWorkingDirectories(opts);

    // Load the app configuration from the dist directory
    const appConfig = loadConfiguration({ appDir: rootDirs.app, distDir: rootDirs.dist }, opts);

    // Instantiate the BotMate container
    this.container = createContainer(this);

    // Register every botmate registry in the container
    this.container.register('config', createConfigProvider(appConfig));
    this.container.register('modules', modulesRegistry(this));
    this.container.register('hooks', hooksRegistry());
    this.container.register('services', servicesRegistry(this));
    this.container.register('plugins', pluginsRegistry(this));
    this.container.register('controllers', controllersRegistry());

    this.dirs = utils.getDirs(rootDirs, { botmate: this });

    this.server = createServer(this);
    this.isLoaded = false;
    this.log = createLogger({});
    this.eventHub = new EventEmitter2({
      delimiter: '.',
    });
  }

  async bootstrap() {
    await this.server.initRouting();
    await this.runLifecyclesFunctions(LIFECYCLES.BOOTSTRAP);
  }

  async load() {
    await this.register();
    await this.bootstrap();

    this.isLoaded = true;
  }

  get config() {
    return this.container.get('config');
  }

  get hooks() {
    return this.container.get('hooks').getAll();
  }

  hook(name: string) {
    return this.container.get('hooks').get(name);
  }

  get services() {
    return this.container.get('services').getAll();
  }

  service(uid: string) {
    return this.container.get('services').get(uid);
  }

  get controllers() {
    return this.container.get('controllers').getAll();
  }

  controller(uid) {
    return this.container.get('controllers').get(uid);
  }

  get plugins() {
    return this.container.get('plugins').getAll();
  }

  plugin(name: string) {
    return this.container.get('plugins').get(name);
  }

  get bots() {
    return this.container.get('bots').getAll();
  }

  bot(id: string) {
    return this.container.get('bots').get(id);
  }

  async register() {
    const config = this.config.get('database');
    this.db = await initDb(config.url);

    await Promise.all([
      //
      this.loadApp(),
      this.loadAmin(),
      this.loadPlugins(),
    ]);

    await this.runLifecyclesFunctions(LIFECYCLES.REGISTER);
    return this;
  }

  loadAmin() {
    loaders.loadAdmin(this);
  }

  async loadPlugins() {
    await loaders.loadPlugins(this);
  }

  async loadApp() {
    this.app = await loaders.loadSrcIndex(this);
  }

  async listen() {
    const { host, port } = this.config.get('server');

    this.server.listen(port, host, () => {
      console.log(`BotMate is listening on http://${host}:${port}`);
    });
  }

  async runLifecyclesFunctions(lifecycleName) {
    // call lifecycle hook of all plugins
    await this.container.get('modules')[lifecycleName]();

    // user
    const userLifecycleFunction = this.app && this.app[lifecycleName];
    if (isFunction(userLifecycleFunction)) {
      await userLifecycleFunction({ botmate: this });
    }

    // admin
    const adminLifecycleFunction = this.admin && this.admin[lifecycleName];
    if (isFunction(adminLifecycleFunction)) {
      await adminLifecycleFunction({ botmate: this });
    }
  }

  async start() {
    console.log(`Starting BotMate instance...`);

    await this.load();
    await this.listen();
    return this;
  }

  async stop() {}

  async destroy() {
    console.log(`Destroying BotMate instance...`);
  }

  reload(): {
    (): void;
    isReloading: boolean;
    isWatching: boolean;
  } {
    const state = {
      shouldReload: 0,
      isWatching: false,
    };

    const self = this;
    const reload = function () {
      const state = {
        shouldReload: 0,
      };

      if (state.shouldReload > 0) {
        // Reset the reloading state
        state.shouldReload -= 1;
        reload.isReloading = false;
        return;
      }

      if (self.config.get('autoReload')) {
        process.send('reload');
      }
    };

    Object.defineProperty(reload, 'isWatching', {
      configurable: true,
      enumerable: true,
      set(value) {
        // Special state when the reloader is disabled temporarly (see GraphQL plugin example).
        if (state.isWatching === false && value === true) {
          state.shouldReload += 1;
        }
        state.isWatching = value;
      },
      get() {
        return state.isWatching;
      },
    });

    reload.isReloading = false;
    reload.isWatching = true;

    reload();
    return reload;
  }

  stopWithError(err: any, customMessage?: string) {
    this.log.debug(`⛔️ Server wasn't able to start properly.`);
    if (customMessage) {
      this.log.error(customMessage);
    }

    this.log.error(err);
    return this.stop();
  }
}

export default (options: any) => {
  const botmate = new BotMate(options);
  Object.assign(globalThis, { botmate });
  return botmate;
};

export { BotMate };
