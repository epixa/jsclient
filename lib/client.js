'use strict';

import { Response } from './response';

export class Client {
  constructor(config={}) {
    // config.url
    // config.token
    // todo: set up properties
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
    // return fn to execute request of given name
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
