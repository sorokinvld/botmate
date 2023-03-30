import _ from 'lodash';

function env(key: string, defaultValue?: string): string | undefined {
  return _.has(process.env, key) ? process.env[key] : defaultValue;
}

const utils = {
  int(key: string, defaultValue?: number): number | undefined {
    if (!_.has(process.env, key)) {
      return defaultValue;
    }

    const value: any = process.env[key];
    return parseInt(value, 10);
  },

  float(key: string, defaultValue?: number): number | undefined {
    if (!_.has(process.env, key)) {
      return defaultValue;
    }

    const value: any = process.env[key];
    return parseFloat(value);
  },

  bool(key: string, defaultValue?: boolean): boolean | undefined {
    if (!_.has(process.env, key)) {
      return defaultValue;
    }

    const value: any = process.env[key];
    return value === 'true';
  },

  json(key: string, defaultValue?: any): any {
    if (!_.has(process.env, key)) {
      return defaultValue;
    }

    const value: any = process.env[key];
    try {
      return JSON.parse(value);
    } catch (error) {
      throw new Error(`Invalid json environment variable ${key}: ${error.message}`);
    }
  },

  array(key: string, defaultValue?: string[]): string[] | undefined {
    if (!_.has(process.env, key)) {
      return defaultValue;
    }

    let value: any = process.env[key];

    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.substring(1, value.length - 1);
    }

    return value.split(',').map((v) => {
      return _.trim(_.trim(v, ' '), '"');
    });
  },

  date(key: string, defaultValue?: Date): Date | undefined {
    if (!_.has(process.env, key)) {
      return defaultValue;
    }

    const value: any = process.env[key];
    return new Date(value);
  },

  /**
   * Gets a value from env that matches oneOf provided values
   * @param {string} key
   * @param {string[]} expectedValues
   * @param {string|undefined} defaultValue
   * @returns {string|undefined}
   */
  oneOf(key: string, expectedValues: string[], defaultValue?: string): string | undefined {
    if (!expectedValues) {
      throw new Error(`env.oneOf requires expectedValues`);
    }

    if (defaultValue && !expectedValues.includes(defaultValue)) {
      throw new Error(`env.oneOf requires defaultValue to be included in expectedValues`);
    }

    const rawValue: any = env(key, defaultValue);
    return expectedValues.includes(rawValue) ? rawValue : defaultValue;
  },
};

Object.assign(env, utils);

export default env;
