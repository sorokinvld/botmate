import { Router } from 'express';
import { createExpressApp } from './express';

const createServer = (botmate: BotMate.BotMateInstance) => {
  const app = createExpressApp();

  return {
    app,
    routes(routes: Router[]) {
      routes.forEach((route) => {
        app.use(route);
      });
    },
  };
};

export { createServer };
