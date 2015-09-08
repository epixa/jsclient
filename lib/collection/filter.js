'use strict';

const $view = Symbol('view');

export class Filter {
  constructor(view) {
    this[$view] = view;
  }

  get view() {
    return this[$view];
  }

  matches() {
    throw new Error('Not implemented');
  }
};
