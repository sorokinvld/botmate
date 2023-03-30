'use strict';

import { IRouter, Router } from 'express';

import { createRouteManager } from './routing';

const createAPI = (botmate, opts: any) => {
  const { prefix, type } = opts;

  const apiRouter = Router();

  const routeManager = createRouteManager(botmate, { type });

  return {
    listRoutes() {
      return [...apiRouter.stack];
    },

    use(fn) {
      apiRouter.use(fn);
      return this;
    },

    routes(routes) {
      routeManager.addRoutes(routes, apiRouter);
      return this;
    },

    mount(router: Router) {
      router.use(apiRouter);
      return this;
    },
  };
};

export { createAPI };
