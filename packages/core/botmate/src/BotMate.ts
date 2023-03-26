import path from 'path';
import { Express } from 'express';
import { isFunction } from 'lodash';
import { createContainer } from './container';
import loadConfiguration from './core/app-configuration';
import createConfigProvider from './core/registeries/config';
import pluginsRegistry from './core/registeries/plugins';
import modulesRegistry from './core/registeries/modules';
import botsRegistry from './core/registeries/bots';
import * as utils from './utils';
import * as loaders from './core/loaders';
import LIFECYCLES from './utils/lifecycles';
import { createServer } from './server';
import { findBots } from './core/bots';
import { coreStoreModel, createCoreStore } from './core/store';
import { createLogger } from '@botmate/logger';
import { Database } from '@botmate/database';

const resolveWorkingDirectories = (opts) => {
  const cwd = process.cwd();

  const appDir = opts.appDir ? path.resolve(cwd, opts.appDir) : cwd;
  const distDir = opts.distDir ? path.resolve(cwd, opts.distDir) : appDir;

  return { app: appDir, dist: distDir };
};

class BotMate {
  container: any;
  dirs: any;
  server: Express;
  isLoaded: boolean;
  app: any;
  admin: any;
  bots: any[];
  db: Database;
  log: ReturnType<typeof createLogger>;
  store: ReturnType<typeof createCoreStore>;

  constructor(opts = {}) {
    const rootDirs = resolveWorkingDirectories(opts);

    // Load the app configuration from the dist directory
    const appConfig = loadConfiguration({ appDir: rootDirs.app, distDir: rootDirs.dist }, opts);

    // Instantiate the BotMate container
    this.container = createContainer(this);

    // Register every botmate registry in the container
    this.container.register('config', createConfigProvider(appConfig));
    this.container.register('modules', modulesRegistry(this));
    this.container.register('plugins', pluginsRegistry(this));
    this.container.register('bots', botsRegistry());

    this.dirs = utils.getDirs(rootDirs, { botmate: this });

    this.bots = [];
    this.server = createServer(this);
    this.isLoaded = false;
    this.log = createLogger({});
  }

  async bootstrap() {
    const contentTypes = [coreStoreModel];

    this.db = await Database.init({
      ...this.config.get('database'),
      models: Database.transformContentTypes(contentTypes),
    });

    this.store = createCoreStore({ db: this.db });

    await this.db.schema.sync();
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

  async loadBots() {
    this.bots = await findBots();
  }

  async register() {
    await Promise.all([
      //
      this.loadApp(),
      this.loadAmin(),
      this.loadPlugins(),
      this.loadBots(),
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
      console.log("this.config.get('autoReload')", self.config.get('autoReload'));

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
