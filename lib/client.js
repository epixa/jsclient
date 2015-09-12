'use strict';

import { Response } from './response';
import * as assert from '../lib/assert';

const $collections = Symbol('collections');
const $models = Symbol('models');
const $requests = Symbol('requests');
const $request = Symbol('request');

export class Client {
  constructor({ url, token, request, Promise }) {
    assert.isFunction(request);
    assert.exists(Promise);

    this[$collections] = new Map();
    this[$models] = new Map();
    this[$requests] = new Map();
    this[$request] = request;
    this.Promise = Promise;
  }

  collections(collections) {
    toMap(this[$collections], collections);
  }

  models(models) {
    toMap(this[$models], models);
  }

  requests(requests) {
    toMap(this[$requests], requests);
  }

  model(name) {
    // return factory fn to instantiate new model of given name
  }

  collection(name) {
    // return factory fn to instantiate new collection of given name
  }

  request(name) {
    // return fn to execute request of given name
  }

  $send({ method, url, body, params, headers }) {
    headers = Object.assign({
      'content-type': 'application/json', // todo: make default configurable
      'accept': 'application/json' // todo: make default configurable
    }, headers);

    const requestArgs = { method, url, body, params, headers };
    const request = this[$request](requestArgs);
    return new Response(request, this.Promise);
  }
}

function toMap(map, obj) {
  Object.keys(obj).forEach(name => map.set(name, obj[name]));
}
