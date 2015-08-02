'use strict';

export function notEmpty(val) {
  if (val === undefined) {
    throw new TypeError('Cannot be undefined');
  }

  if (val === null) {
    throw new TypeError('Cannot be null');
  }

  if (val === '') {
    throw new TypeError('Cannot be an empty string');
  }

  if (val === 0) {
    throw new TypeError('Cannot be 0 (zero)');
  }

  if (val instanceof Array && val.length === 0) {
    throw new TypeError('Cannot be am empty array');
  }
}

export function isString(val) {
  const type = typeof val;
  if (type !== 'string') {
    throw new TypeError(`Expected string, got ${type}`);
  }
}

export function isFunction(val) {
  const type = typeof val;
  if (type !== 'function') {
    throw new TypeError(`Expecting function, got ${type}`);
  }
}
