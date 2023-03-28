'use strict';

import _ from 'lodash';

export default (initialConfig = {}) => {
  const _config = { ...initialConfig }; // not deep clone because it would break some config

  return {
    ..._config,
    get(path: string, defaultValue: any) {
      return _.get(_config, path, defaultValue);
    },
    set(path: string, val: any) {
      _.set(_config, path, val);
      return this;
    },
    has(path: string) {
      return _.has(_config, path);
    },
  };
};
