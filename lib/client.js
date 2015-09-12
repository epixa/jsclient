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
    return factoryFromMap(this[$models], name);
  }

  collection(name) {
    return factoryFromMap(this[$collections], name);
  }

  request(name) {
    return factoryFromMap(this[$requests], name);
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

function factoryFromMap(map, name) {
  if (!map.has(name)) {
    throw new Error(`${name} is not configured on client`);
  }

  const Class = map.get(name);
  return (...args) => new Class(...args);
}

function toMap(map, obj) {
  Object.keys(obj).forEach(name => map.set(name, obj[name]));
}
