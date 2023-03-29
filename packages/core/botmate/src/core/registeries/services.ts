'use strict';

import { pickBy, has } from 'lodash/fp';
import { addNamespace, hasNamespace } from '../utils';

export type Service = {
  [key: string]: (...args: any) => any;
};

export type ServiceFactory = ({ botmate }: { botmate: BotMate.BotMateInstance }) => Service;

const servicesRegistry = (botmate: BotMate.BotMateInstance) => {
  const services = {};
  const instantiatedServices = {};

  return {
    /**
     * Returns this list of registered services uids
     */
    keys(): string[] {
      return Object.keys(services);
    },

    /**
     * Returns the instance of a service. Instantiate the service if not already done
     */
    get(uid: string): Service {
      console.log('uid', uid);
      if (instantiatedServices[uid]) {
        return instantiatedServices[uid];
      }

      const service = services[uid];
      console.log('service', service);
      if (service) {
        instantiatedServices[uid] = typeof service === 'function' ? service({ botmate }) : service;
        return instantiatedServices[uid];
      }
    },

    /**
     * Returns a map with all the services in a namespace
     */
    getAll(namespace: string): { [key: string]: Service } {
      const filteredServices = pickBy((_, uid) => hasNamespace(uid, namespace))(services);

      // create lazy accessor to avoid instantiating the services;
      const map = {};
      for (const uid of Object.keys(filteredServices)) {
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
     * Registers a service
     */
    set(uid: string, service: Service) {
      services[uid] = service;
      delete instantiatedServices[uid];
      return this;
    },

    /**
     * Registers a map of services for a specific namespace
     */
    add(namespace: string, newServices: { [key: string]: Service | ServiceFactory }) {
      if (!newServices) {
        return;
      }
      for (const serviceName of Object.keys(newServices)) {
        const service = newServices[serviceName];
        const uid = addNamespace(serviceName, namespace);

        if (has(uid, services)) {
          throw new Error(`Service ${uid} has already been registered.`);
        }
        services[uid] = service;
      }

      return this;
    },

    /**
     * Wraps a service to extend it
     */
    extend(uid: string, extendFn: (service: Service) => Service) {
      const currentService = this.get(uid);

      if (!currentService) {
        throw new Error(`Service ${uid} doesn't exist`);
      }

      const newService = extendFn(currentService);
      instantiatedServices[uid] = newService;

      return this;
    },
  };
};

export default servicesRegistry;
