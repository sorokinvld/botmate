'use strict';

import _ from 'lodash';

const createRouteScopeGenerator = (namespace: string) => (route) => {
  const prefix = namespace.endsWith('::') ? namespace : `${namespace}.`;

  if (typeof route.handler === 'string') {
    _.defaultsDeep(route, {
      config: {
        auth: {
          scope: [`${route.handler.startsWith(prefix) ? '' : prefix}${route.handler}`],
        },
      },
    });
  }
};

/**
 * Register all routes
 */
function registerAllRoutes(botmate: BotMate.BotMateInstance) {
  registerAdminRoutes(botmate);
  registerAPIRoutes(botmate);
  registerPluginRoutes(botmate);
}

/**
 * Register admin routes
 */
const registerAdminRoutes = (botmate) => {
  const generateRouteScope = createRouteScopeGenerator(`admin::`);

  botmate.admin.routes.forEach((route) => {
    generateRouteScope(route);
    route.info = { pluginName: 'admin' };
  });

  botmate.server.routes({
    type: 'admin',
    prefix: '/admin',
    routes: botmate.admin.routes,
  });
};

/**
 * Register plugin routes
 */
const registerPluginRoutes = (botmate) => {
  for (const pluginName of Object.keys(botmate.plugins)) {
    const plugin = botmate.plugins[pluginName];

    const generateRouteScope = createRouteScopeGenerator(`plugin::${pluginName}`);

    if (Array.isArray(plugin.routes)) {
      plugin.routes.forEach((route) => {
        generateRouteScope(route);
        route.info = { pluginName };
      });

      botmate.server.routes({
        type: 'admin',
        routes: plugin.routes,
      });
    } else {
      _.forEach(plugin.routes, (router) => {
        router.type = router.type || 'admin';
        router.routes.forEach((route) => {
          generateRouteScope(route);
          route.info = { pluginName };
        });

        botmate.server.routes(router);
      });
    }
  }
};

/**
 * Register api routes
 */
const registerAPIRoutes = (botmate) => {
  // for (const apiName of Object.keys(botmate.api)) {
  //   const api = botmate.api[apiName];
  //   const generateRouteScope = createRouteScopeGenerator(`api::${apiName}`);
  //   _.forEach(api.routes, (router) => {
  //     // TODO: remove once auth setup
  //     // pass meta down to compose endpoint
  //     router.type = 'content-api';
  //     router.routes.forEach((route) => {
  //       generateRouteScope(route);
  //       route.info = { apiName };
  //     });
  //     return botmate.server.routes(router);
  //   });
  // }
};

export default registerAllRoutes;
