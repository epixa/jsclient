'use strict';

const $client = this[$client];

export class Request {
  constructor(client) {
    this[$client] = client;

    !this.init || this.init();
  }

  get client() {
    return this[$client];
  }

  $send() {
    throw new Error('$send is not implemented for this request');
  }
}
