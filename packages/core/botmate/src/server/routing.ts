'use strict';

import { Router } from 'express';
import _ from 'lodash';
import { yup } from '@botmate/utils';

import createEndpointComposer from './compose-endpoint';

const policyOrMiddlewareSchema = yup.lazy((value) => {
  if (typeof value === 'string') {
    return yup.string().required();
  }

  if (typeof value === 'function') {
    return yup.mixed().isFunction();
  }

  return yup.object({
    name: yup.string().required(),
    options: yup.object().notRequired(), // any options
  });
});

const routeSchema = yup.object({
  method: yup.string().oneOf(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'ALL']).required(),
  path: yup.string().required(),
  handler: yup.lazy((value) => {
    if (typeof value === 'string') {
      return yup.string().required();
    }

    if (Array.isArray(value)) {
      return yup.array().required();
    }

    return yup.mixed().required();
  }),
  config: yup
    .object({
      auth: yup.lazy((value) => {
        if (value === false) {
          return yup.boolean().required();
        }

        return yup.object({
          scope: yup.array().of(yup.string()).required(),
        });
      }),
      policies: yup.array().of(policyOrMiddlewareSchema).notRequired(),
      middlewares: yup.array().of(policyOrMiddlewareSchema).notRequired(),
    })
    .notRequired(),
});

const validateRouteConfig = (routeConfig) => {
  try {
    return routeSchema.validateSync(routeConfig, {
      strict: true,
      abortEarly: false,
      stripUnknown: true,
    });
  } catch (error) {
    throw new Error('Invalid route config ' + error.message);
  }
};

const createRouteManager = (botmate, opts: any) => {
  const { type } = opts;

  const composeEndpoint = createEndpointComposer(botmate);

  const createRoute = (route, router) => {
    validateRouteConfig(route);

    // NOTE: the router type is used to tag controller actions and for authentication / authorization so we need to pass this info down to the route level
    _.set(route, 'info.type', type || 'admin');

    composeEndpoint(route, { router });
  };

  const addRoutes = (routes: any[] | any, router: Router) => {
    // router, here, is the main API router
    if (Array.isArray(routes)) {
      routes.forEach((route) => createRoute(route, router));
    } else if (routes.routes) {
      routes.routes.forEach((route) => {
        createRoute(route, router);
      });
      return router;
    }
  };

  return {
    addRoutes,
  };
};

export { validateRouteConfig, createRouteManager };
