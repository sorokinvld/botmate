'use strict';

import { IRouter, Router } from 'express';

import { createRouteManager } from './routing';

const createAPI = (botmate, opts: any) => {
  const { prefix, type } = opts;

  const api = Router();

  api.get('/api', (req, res) => {
    res.json({
      x: true,
    });
  });

  const routeManager = createRouteManager(botmate, { type });

  return {
    listRoutes() {
      return [...api.stack];
    },

    use(fn) {
      api.use(fn);
      return this;
    },

    routes(routes) {
      routeManager.addRoutes(routes, api);
      return this;
    },

    mount(router: Router) {
      router.use(api);
      return this;
    },
  };
};

export { createAPI };
