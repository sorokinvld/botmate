import { Router } from 'express';
import { createAdminAPI } from './admin-api';
import { createExpressApp } from './express';
import createPluginApi from './plugin-api';
import path from 'path';

const createServer = (botmate: BotMate.BotMateInstance) => {
  const app = createExpressApp();

  const router = Router();

  const apis = {
    admin: createAdminAPI(botmate),
  };

  return {
    app,
    router,
    routes(routes) {
      return this;
    },
    initRouting() {
      app.get('*', (req, res) => {
        res.sendFile(path.join(process.cwd(), 'dist', 'build', 'index.html'));
      });
    },
    listen(...args) {
      const pluginApi = createPluginApi(botmate);
      app.use('/api/plugins', pluginApi);

      return app.listen(...args);
    },
  };
};

export { createServer };
