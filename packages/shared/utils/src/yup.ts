import * as yup from 'yup';
import { isUndefined, isFunction as _isFunction } from 'lodash';

declare module 'yup' {
  interface StringSchema {
    numberStringx(msg?: string): this;
  }
  interface MixedSchema {
    isFunction(msg?: string): this;
  }
}

function isFunction(message = '${path} is not a function') {
  return this.test(
    'is a function',
    message,
    (value: any) => isUndefined(value) || _isFunction(value)
  );
}

yup.addMethod(yup.mixed, 'isFunction', isFunction);

export default yup;
