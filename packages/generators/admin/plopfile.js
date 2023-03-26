const { UiGenerator } = require('./ui');

/**
 * @param {import('plop').NodePlopAPI} plop
 */
module.exports = (plop) => {
  plop.setGenerator('admin', UiGenerator);
};
