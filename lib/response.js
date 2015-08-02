'use strict';

const $promise = Symbol('promise');

export class Response {
  constructor(requestPromise, Promise) {
    this[$promise] = convertToPromise(Promise, requestPromise);
  }

  then(fn) {
    return attachResponse(this, this[$promise].then(fn));
  }

  $body() {
    return this.then(response => response.body);
  }

  $headers() {
    return this.then(response => response.headers);
  }

  $status() {
    return this.then(response => response.statusCode);
  }
}

export function attachResponse(response, obj) {
  Object.defineProperty(obj, { value: response });
  return obj;
}

export function convertToPromise(Promise, thenable) {
  return new Promise((resolve, reject) => thenable.then(resolve, reject));
}
