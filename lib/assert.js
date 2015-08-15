'use strict';

export function isFunction(val) {
  const type = typeof val;
  if (type !== 'function') {
    throw new TypeError(`Expecting function, got ${type}`);
  }
}

export function exists(val) {
  if (typeof val === 'undefined') {
    throw new TypeError('Value must exist, cannot be undefined');
  }
  if (val === null) {
    throw new TypeError('Value must exist, cannot be null');
  }
}
