'use strict';

import _ from 'lodash';
import { validateModule } from './validation';
import { removeNamespace } from '../../utils';

const uidToPath = (uid: string) => uid.replace('::', '.');

const removeNamespacedKeys = (map: Object, namespace: string) => {
  return _.mapKeys(map, (_, key) => removeNamespace(key, namespace));
};

const defaultModule = {
  config: {},
  controllers: {},
  services: {},
};

const createModule = (namespace: string, rawModule: any, botmate: BotMate.BotMateInstance) => {
  _.defaults(rawModule, defaultModule);

  try {
    validateModule(rawModule);
  } catch (e) {
    throw new Error(`entry.js is invalid for '${namespace}'.\n${e.errors.join('\n')}`);
  }

  const called: any = {};

  return {
    async bootstrap() {
      if (called.bootstrap) {
        throw new Error(`Bootstrap for ${namespace} has already been called`);
      }
      called.bootstrap = true;
      await (rawModule.bootstrap && rawModule.bootstrap({ botmate }));
    },
    async register() {
      if (called.register) {
        throw new Error(`Register for ${namespace} has already been called`);
      }
      called.register = true;
      await (rawModule.register && rawModule.register({ botmate }));
    },
    service(serviceName) {
      return botmate.container.get('services').get(`${namespace}.${serviceName}`);
    },
    get services() {
      const services = botmate.container.get('services').getAll(namespace);
      return removeNamespacedKeys(services, namespace);
    },
    async destroy() {
      if (called.destroy) {
        throw new Error(`Destroy for ${namespace} has already been called`);
      }
      called.destroy = true;
      await (rawModule.destroy && rawModule.destroy({ botmate }));
    },
    get routes() {
      return rawModule.routes;
    },
    controller(controllerName: string) {
      return botmate.container.get('controllers').get(`${namespace}.${controllerName}`);
    },
    get controllers() {
      const controllers = botmate.container.get('controllers').getAll(namespace);
      return removeNamespacedKeys(controllers, namespace);
    },

    load() {
      botmate.container.get('config').set(uidToPath(namespace), rawModule.config);
      botmate.container.get('services').add(namespace, rawModule.services);
      botmate.container.get('controllers').add(namespace, rawModule.controllers);
    },
    config(path, defaultValue) {
      return botmate.container.get('config').get(`${uidToPath(namespace)}.${path}`, defaultValue);
    },
  };
};

export { createModule };
