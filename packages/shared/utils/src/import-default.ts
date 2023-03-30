'use strict';

const importDefault =
  // @ts-ignore
  (this && this.importDefault) ||
  function (modName) {
    const mod = require(modName);
    return mod && mod.__esModule ? mod.default : mod;
  };

export default importDefault;
