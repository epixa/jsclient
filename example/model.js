'use strict';

import { Model as BaseModel } from '../lib/model';

export class Model extends BaseModel {
  static createUrl(model) {
    return `${model.collection.url}/${model.id}`;
  }

  get url() {
    // todo: see if having a prototype function and direct property named url would even work
    return this.url || Model.createUrl(this);
  }
}
