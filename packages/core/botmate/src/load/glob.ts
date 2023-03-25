'use strict';

import glob, { GlobOptionsWithFileTypesUnset } from 'glob';

/**
 * Promise based glob
 */
export default (pattern, options: GlobOptionsWithFileTypesUnset) => {
  return new Promise((resolve, reject) => {
    glob(pattern, options).then(resolve).catch(reject);
  });
};
