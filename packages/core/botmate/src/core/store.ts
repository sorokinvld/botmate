'use strict';

import { Database } from '@botmate/database';

const coreStoreModel = {
  uid: 'botmate::core-store',
  collectionName: 'botmate_core_store_settings',
  attributes: {
    key: {
      type: 'string',
    },
    value: {
      type: 'text',
    },
    type: {
      type: 'string',
    },
    environment: {
      type: 'string',
    },
    tag: {
      type: 'string',
    },
  },
};

const createCoreStore = ({ db }: { db: Database }) => {
  const mergeParams = (defaultParams, params) => {
    return {
      ...defaultParams,
      ...params,
    };
  };

  const store = function (defaultParams = {}) {
    return {
      get: (params) => storeDb.get(mergeParams(defaultParams, params)),
      set: (params) => storeDb.set(mergeParams(defaultParams, params)),
      delete: (params) => storeDb.delete(mergeParams(defaultParams, params)),
    };
  };

  const storeDb = {
    /**
     * Get value from the core store
     */
    async get(params: any = {}) {
      const { key, type = 'core', environment, name, tag } = params;

      const prefix = `${type}${name ? `_${name}` : ''}`;

      const where = {
        key: `${prefix}_${key}`,
        environment: environment || null,
        tag: tag || null,
      };

      const data = await db.query('botmate::core-store').findOne({ where });

      if (!data) {
        return null;
      }

      if (
        data.type === 'object' ||
        data.type === 'array' ||
        data.type === 'boolean' ||
        data.type === 'string'
      ) {
        try {
          return JSON.parse(data.value);
        } catch (err) {
          return new Date(data.value);
        }
      } else if (data.type === 'number') {
        return Number(data.value);
      } else {
        return null;
      }
    },

    /**
     * Set value in the core store
     */
    async set(params: any = {}) {
      const { key, value, type, environment, name, tag } = params;

      const prefix = `${type}${name ? `_${name}` : ''}`;

      const where = {
        key: `${prefix}_${key}`,
        environment: environment || null,
        tag: tag || null,
      };

      const data = await db.query('botmate::core-store').findOne({ where });

      if (data) {
        return db.query('botmate::core-store').update({
          where: { id: data.id },
          data: {
            value: JSON.stringify(value) || value.toString(),
            type: typeof value,
          },
        });
      }

      return db.query('botmate::core-store').create({
        data: {
          ...where,
          value: JSON.stringify(value) || value.toString(),
          type: typeof value,
        },
      });
    },

    /**
     * Deletes a value from the core store
     */
    async delete(params: any = {}) {
      const { key, environment, type, name, tag } = params;

      const prefix = `${type}${name ? `_${name}` : ''}`;

      const where = {
        key: `${prefix}_${key}`,
        environment: environment || null,
        tag: tag || null,
      };

      return db.query('botmate::core-store').delete({ where });
    },
  };

  return store;
};

export { coreStoreModel, createCoreStore };
