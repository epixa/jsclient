'use strict';

import { Request as BaseRequest } from '../lib/request';

import * as assert from '../lib/assert';

export class Request extends BaseRequest {
  constructor(...args) {
    this.method = 'get';
    super(...args);
  }

  $send(params) {
    assertMethod(this.method);
    assertPath(this.path);

    return this.client.$send({
      params,
      method: this.method,
      path: this.path
    });
  }
}

export function assertMethod(method) {
  assert.isString(method);
  assert.notEmpty(method);
}

export function exportPath(path) {
  assert.isString(path);
  assert.notEmpty(path);
}
