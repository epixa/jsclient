'use strict';

import { Response } from './response';

const $requests = Symbol('requests');

export class Client {
  constructor(config={}) {
    // config.url
    // config.token
    // todo: set up properties
    this[$requests] = new Map();
  }

  collections(arr) {

  }

  models(arr) {

  }

  requests(arr) {

  }

  model(name) {
    // return factory fn to instantiate new model of given name
  }

  collection(name) {
    // return factory fn to instantiate new collection of given name
  }

  request(name) {
    if (!this[$requests].has(name)) throw new Error(`No request named ${name} is configured`);

    const handler = this[$requests].get(name);
    return (...args) => {
      const request = new Request();
      const response = new Response();
      return handler.run(request, response);
    };
  }

  $send({ method, url, body, params, headers }) {
    headers = Object.assign({
      'content-type': 'application/json', // todo: make default configurable
      'accept': 'application/json' // todo: make default configurable
    }, headers);

    const requestArgs = { method, url, body, params, headers };
    const request = this.connection.send(requestArgs); // todo: how is connection set?
    return new Response(request, this.Promise); // todo: make Promise be something
  }
}

// todo: possibly remove all of this handler crap
const $totalArgs = Symbol('totalArgs');
const $handler = Symbol('handler');
const $healthy = Symbol('healthy');
const $unhealthy = Symbol('unhealthy');

class Handler {
  constructor(totalArgs, fn) {
    this[$totalArgs] = totalArgs;
    this[$handler] = fn;
    this[$healthy] = [];
    this[$unhealthy] = [];
  }

  get totalArgs() {
    return this[$totalArgs];
  }

  use(fn) {
    const queue = this.isErrorHandler(fn) ? this[$unhealthy] : this[$healthy];
    queue.push(fn);
    return this;
  }

  isErrorHandler(fn) {
    return fn.length > this.totalArgs + 1;
  }

  run(...args) {
    this[$healthy].every(fn => {
      fn(...args)
    });
  }
}
