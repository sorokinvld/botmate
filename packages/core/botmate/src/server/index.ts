import path from 'path';
import { Router } from 'express';
import { createExpressApp } from './express';
import createPluginApi from './plugin-api';
import { createRouteManager } from './routing';
import registerAllRoutes from './register-routes';

const createServer = (botmate: BotMate.BotMateInstance) => {
  const app = createExpressApp();

  const apiRouter = Router();
  const routeManager = createRouteManager(botmate, {});

  return {
    app,
    apiRouter,
    routes(routes) {
      routeManager.addRoutes(routes, apiRouter);
      return this;
    },
    initRouting() {
      registerAllRoutes(botmate);
    },
    listen(...args) {
      const pluginApi = createPluginApi(botmate);

      app.use('/api', apiRouter);
      app.use('/api/plugins', pluginApi);

      const buildDir = path.resolve(botmate.dirs.dist.root, 'build');

      app.get('*', (req, res) => {
        res.sendFile(path.join(buildDir, 'index.html'));
      });

      return app.listen(...args);
    },
  };
};

export { createServer };
