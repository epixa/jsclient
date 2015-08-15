'use strict';

const $callback = Symbol('callback');
const $identity = Symbol('identity');

export class Filter {
  constructor(identity, callback) {
    this[$callback] = callback;
    this[$identity] = identity;
  }

  get callback() {
    return this[$callback];
  }

  get identity() {
    return this[$identity];
  }
};
