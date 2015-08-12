'use strict';

export function isFunction(val) {
  const type = typeof val;
  if (type !== 'function') {
    throw new TypeError(`Expecting function, got ${type}`);
  }
}
