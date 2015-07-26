'use strict';

const $callback = Symbol('callback');
const $name = Symbol('name');

export class Filter {
  constructor(name, callback) {
    this[$callback] = callback;
    this[$name] = name;
  }

  get callback() {
    return this[$callback];
  }

  get name() {
    return this[$name];
  }
}
