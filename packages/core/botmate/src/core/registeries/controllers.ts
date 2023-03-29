'use strict';

import { pickBy, has } from 'lodash/fp';
import { addNamespace, hasNamespace } from '../utils';

export type Controller = {
  [key: string]: (...args: any) => any;
};

export type ControllerFactory = ({ botmate }: { botmate: BotMate.BotMateInstance }) => Controller;

const controllersRegistry = () => {
  const controllers: { [key: string]: Controller | ControllerFactory } = {};
  const instances: { [key: string]: Controller } = {};

  return {
    /**
     * Returns this list of registered controllers uids
     */
    keys(): string[] {
      return Object.keys(controllers);
    },

    /**
     * Returns the instance of a controller. Instantiate the controller if not already done
     */
    get(uid: string): Controller {
      if (instances[uid]) {
        return instances[uid];
      }

      const controller = controllers[uid];

      if (controller) {
        instances[uid] = typeof controller === 'function' ? controller({ botmate }) : controller;
        return instances[uid];
      }
    },

    /**
     * Returns a map with all the controller in a namespace
     */
    getAll(namespace: string): { [key: string]: Controller } {
      const filteredControllers = pickBy((_, uid) => hasNamespace(uid, namespace))(controllers);

      const map: { [key: string]: Controller } = {};
      for (const uid of Object.keys(filteredControllers)) {
        Object.defineProperty(map, uid, {
          enumerable: true,
          get: () => {
            return this.get(uid);
          },
        });
      }

      return map;
    },

    /**
     * Registers a controller
     */
    set(uid: string, value: Controller) {
      controllers[uid] = value;
      delete instances[uid];
      return this;
    },

    /**
     * Registers a map of controllers for a specific namespace
     */
    add(namespace: string, newControllers: { [key: string]: Controller | ControllerFactory }) {
      for (const controllerName of Object.keys(newControllers)) {
        const controller = newControllers[controllerName];
        const uid = addNamespace(controllerName, namespace);

        if (has(uid, controllers)) {
          throw new Error(`Controller ${uid} has already been registered.`);
        }
        controllers[uid] = controller;
      }

      return this;
    },

    /**
     * Wraps a controller to extend it
     */
    extend(controllerUID: string, extendFn: (controller: Controller) => Controller) {
      const currentController = this.get(controllerUID);

      if (!currentController) {
        throw new Error(`Controller ${controllerUID} doesn't exist`);
      }

      const newController = extendFn(currentController);
      instances[controllerUID] = newController;

      return this;
    },
  };
};

export default controllersRegistry;
