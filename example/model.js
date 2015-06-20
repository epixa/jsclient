'use strict';

import { Model as BaseModel } from '../lib/model';

export class Model extends BaseModel {
  get url() {
    return this.url || Model.createUrl(this);
  }

  static createUrl(model) {
    return `${model.collection.url}/${model.id}`;
  }
}
