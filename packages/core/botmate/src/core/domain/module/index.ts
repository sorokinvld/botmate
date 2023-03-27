'use strict';

import _ from 'lodash';
import { validateModule } from './validation';
import { removeNamespace } from '../../utils';

const uidToPath = (uid: string) => uid.replace('::', '.');

const removeNamespacedKeys = (map, namespace) => {
  return _.mapKeys(map, (value, key) => removeNamespace(key, namespace));
};

const defaultModule = {
  config: {},
};

const createModule = (namespace: string, rawModule: any, botmate: BotMate.BotMateInstance) => {
  _.defaults(rawModule, defaultModule);

  try {
    validateModule(rawModule);
  } catch (e) {
    throw new Error(`botmate-server.js is invalid for '${namespace}'.\n${e.errors.join('\n')}`);
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

    load() {
      botmate.container.get('config').set(uidToPath(namespace), rawModule.config);
      botmate.container.get('services').add(namespace, rawModule.services);
      botmate.container.get('config').set(uidToPath(namespace), rawModule.config);
    },
    config(path, defaultValue) {
      return botmate.container.get('config').get(`${uidToPath(namespace)}.${path}`, defaultValue);
    },
  };
};

export { createModule };
