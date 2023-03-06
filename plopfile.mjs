import * as module from './generators/module/generator.mjs';
import * as library from './generators/library/generator.mjs';

export default function (
  /** @type {import('plop').NodePlopAPI} */
  plop,
) {
  plop.setGenerator('module', module.config);
  plop.setGenerator('library', library.config);
}
