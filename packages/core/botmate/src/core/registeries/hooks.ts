'use strict';

import { pickBy } from 'lodash/fp';
import { addNamespace, hasNamespace } from '../utils';

type Handler = (context: any) => any;

type AsyncHook = {
  handlers: Handler[];
  register(handler: Handler): void;
  delete(handler: Handler): void;
  call(): Promise<void>;
};

type SyncHook = {
  get handlers(): Handler[];
  register(handler: Handler): void;
  delete(handler: Handler): void;
  call(): void;
};

export type Hook = AsyncHook | SyncHook;

const hooksRegistry = () => {
  const hooks = {};

  return {
    /**
     * Returns this list of registered hooks uids
     */
    keys(): string[] {
      return Object.keys(hooks);
    },

    /**
     * Returns the instance of a hook.
     */
    get(uid: string): Hook {
      return hooks[uid];
    },

    /**
     * Returns a map with all the hooks in a namespace
     */
    getAll(namespace: string): { [key: string]: Hook } {
      return pickBy((_, uid) => hasNamespace(uid, namespace))(hooks) as { [key: string]: Hook };
    },

    /**
     * Registers a hook
     */
    set(uid: string, hook: Hook): any {
      hooks[uid] = hook;
      return this;
    },

    /**
     * Registers a map of hooks for a specific namespace
     */
    add(namespace: string, newHooks: { [key: string]: Hook }): any {
      for (const hookName of Object.keys(newHooks)) {
        const hook = hooks[hookName];
        const uid = addNamespace(hookName, namespace);

        this.set(uid, hook);
      }

      return this;
    },

    /**
     * Wraps a hook to extend it
     */
    extend(uid: string, extendFn: (hook: Hook) => Hook): any {
      const currentHook = this.get(uid);

      if (!currentHook) {
        throw new Error(`Hook ${uid} doesn't exist`);
      }

      const newHook = extendFn(currentHook);
      hooks[uid] = newHook;

      return this;
    },
  };
};

export default hooksRegistry;
