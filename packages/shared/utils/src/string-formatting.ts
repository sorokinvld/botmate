'use strict';

import _ from 'lodash';
import { trimChars, trimCharsEnd, trimCharsStart } from 'lodash/fp';
import slugify from '@sindresorhus/slugify';
import { kebabCase } from 'lodash';

const nameToSlug = (name: string, options: { separator: string } = { separator: '-' }) =>
  slugify(name, options);

const nameToCollectionName = (name: string) => slugify(name, { separator: '_' });

const toRegressedEnumValue = (value: string) =>
  slugify(value, {
    decamelize: false,
    lowercase: false,
    separator: '_',
  });

const getCommonBeginning = (...strings: string[]) =>
  _.takeWhile(strings[0], (char, index) => strings.every((string) => string[index] === char)).join(
    ''
  );

const getCommonPath = (...paths: string[]) => {
  const [segments, ...otherSegments] = paths.map((it) => _.split(it, '/'));
  return _.join(
    _.takeWhile(segments, (str, index) => otherSegments.every((it) => it[index] === str)),
    '/'
  );
};

const escapeQuery = (query: string, charsToEscape: string[], escapeChar = '\\'): string => {
  return query
    .split('')
    .reduce(
      (escapedQuery, char) =>
        charsToEscape.includes(char)
          ? `${escapedQuery}${escapeChar}${char}`
          : `${escapedQuery}${char}`,
      ''
    );
};

const stringIncludes = (arr: unknown[], val: unknown): boolean =>
  arr.map(String).includes(String(val));
const stringEquals = (a: unknown, b: unknown): boolean => String(a) === String(b);
const isCamelCase = (value: string): boolean => /^[a-z][a-zA-Z0-9]+$/.test(value);
const isKebabCase = (value: string): boolean => /^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/.test(value);
const startsWithANumber = (value: string): boolean => /^[0-9]/.test(value);

const joinBy: (joint: string, ...args: string[]) => string = (joint, ...args) => {
  const trim = trimChars(joint);
  const trimEnd = trimCharsEnd(joint);
  const trimStart = trimCharsStart(joint);

  return args.reduce((url, path, index) => {
    if (args.length === 1) return path;
    if (index === 0) return trimEnd(path);
    if (index === args.length - 1) return url + joint + trimStart(path);
    return url + joint + trim(path);
  }, '');
};

const toKebabCase = (value: string): string => kebabCase(value);

export {
  nameToSlug,
  nameToCollectionName,
  getCommonBeginning,
  getCommonPath,
  escapeQuery,
  stringIncludes,
  stringEquals,
  isCamelCase,
  isKebabCase,
  toKebabCase,
  toRegressedEnumValue,
  startsWithANumber,
  joinBy,
};
