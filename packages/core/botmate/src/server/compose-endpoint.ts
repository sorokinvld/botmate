'use strict';

import { Router } from 'express';
import { has, toLower, castArray, trim, prop, isNil } from 'lodash/fp';

const getMethod = (route) => trim(toLower(route.method));
const getPath = (route) => trim(route.path);

const createRouteInfoMiddleware = (routeInfo) => (ctx, next) => {
  const route = {
    ...routeInfo,
    config: routeInfo.config || {},
  };

  ctx.state.route = route;
  return next();
};

const getAuthConfig = prop('config.auth');

const createAuthorizeMiddleware = (botmate) => async (ctx, next) => {
  const { auth, route } = ctx.state;

  const authService = botmate.container.get('auth');

  try {
    await authService.verify(auth, getAuthConfig(route));

    return next();
  } catch (error) {
    // if (error instanceof UnauthorizedError) {
    //   return ctx.unauthorized();
    // }

    // if (error instanceof ForbiddenError) {
    //   return ctx.forbidden();
    // }

    throw error;
  }
};

const createAuthenticateMiddleware = (botmate) => async (ctx, next) => {
  return botmate.container.get('auth').authenticate(ctx, next);
};

const returnBodyMiddleware = async (ctx, next) => {
  const values = await next();

  if (isNil(ctx.body) && !isNil(values)) {
    ctx.body = values;
  }
};

function createEndpointComposer(botmate) {
  const authenticate = createAuthenticateMiddleware(botmate);
  const authorize = createAuthorizeMiddleware(botmate);

  return (route, { router }) => {
    try {
      const method = getMethod(route);
      const path = getPath(route);

      // const middlewares = resolveRouteMiddlewares(route, botmate);
      // const policies = resolvePolicies(route);

      const action = getAction(route, botmate); // getAction gets controller

      // const routeHandler = compose([
      //   createRouteInfoMiddleware(route),
      //   authenticate,
      //   authorize,
      //   ...policies,
      //   ...middlewares,
      //   returnBodyMiddleware,
      //   ...castArray(action),
      // ]);

      // TODO: Add authentication

      // router.get('/api', (req, res) => res.json({}));
      router[method](path, action);
    } catch (error) {
      console.log('error', error);
      error.message = `Error creating endpoint ${route.method} ${route.path}: ${error.message}`;
      throw error;
    }
  };
}

const getController = (name, { pluginName, apiName }, botmate) => {
  let ctrl;

  if (pluginName) {
    if (pluginName === 'admin') {
      ctrl = botmate.controller(`admin::${name}`);
    } else {
      ctrl = botmate.plugin(pluginName).controller(name);
    }
  } else if (apiName) {
    ctrl = botmate.controller(`api::${apiName}.${name}`);
  }

  if (!ctrl) {
    return botmate.controller(name);
  }

  return ctrl;
};

const extractHandlerParts = (name) => {
  const controllerName = name.slice(0, name.lastIndexOf('.'));
  const actionName = name.slice(name.lastIndexOf('.') + 1);

  return { controllerName, actionName };
};

const getAction = (route, botmate) => {
  const { handler, info = {} } = route;
  const { pluginName, apiName, type } = info;
  if (Array.isArray(handler) || typeof handler === 'function') {
    return handler;
  }
  const { controllerName, actionName } = extractHandlerParts(trim(handler));
  const controller = getController(controllerName, { pluginName, apiName }, botmate);
  if (typeof controller[actionName] !== 'function') {
    throw new Error(`Handler not found "${handler}"`);
  }
  if (has(Symbol.for('__type__'), controller[actionName])) {
    controller[actionName][Symbol.for('__type__')].push(type);
  } else {
    controller[actionName][Symbol.for('__type__')] = [type];
  }
  return controller[actionName].bind(controller);
};

export default createEndpointComposer;
