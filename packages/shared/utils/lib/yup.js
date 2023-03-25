const yup = require('yup');
const _ = require('lodash');

function isFunction(message = '${path} is not a function') {
  return this.test(
    'is a function',
    message,
    (value) => _.isUndefined(value) || _.isFunction(value)
  );
}

yup.addMethod(yup.mixed, 'isFunction', isFunction);

module.exports = yup;
