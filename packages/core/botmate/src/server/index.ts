import { Router } from 'express';
import { createAdminAPI } from './admin-api';
import { createExpressApp } from './express';
import createPluginApi from './plugin-api';
import registerAllRoutes from './register-routes';
import { createRouteManager } from './routing';

const createServer = (botmate: BotMate.BotMateInstance) => {
  const app = createExpressApp();

  const router = Router();
  const routeManager = createRouteManager(botmate, {});

  const apis = {
    admin: createAdminAPI(botmate),
  };

  return {
    app,
    router,
    routes(routes) {
      // if (routes.type) {
      //   const api = apis[routes.type];
      //   if (!api) {
      //     throw new Error(`API ${routes.type} not found. Possible APIs are ${Object.keys(apis)}`);
      //   }

      //   apis[routes.type].routes(routes);
      //   return this;
      // }

      // routeManager.addRoutes(routes, router);
      return this;
    },
    initRouting() {
      // registerAllRoutes(botmate);
    },
    listen(...args) {
      const pluginApi = createPluginApi(botmate);
      app.use('/api/plugins', pluginApi);

      return app.listen(...args);
    },
  };
};

export { createServer };
