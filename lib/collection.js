'use strict';

import { View } from './view';

const $model = Symbol('model');
const $plural = Symbol('plural');
const $views = Symbol('views');
const $client = Symbol('client');

export class Collection extends Map {
  constructor(client) {
    this[$client] = client;
    this[$model] = null;
    this[$plural] = null;
    this[$views] = new Map();

    !this.init || this.init();
  }

  get client() {
    return this[$client];
  }

  model(name) {
    if (name) {
      this[$model] = name;
      if (!this[$plural]) {
        this.plural(`${name}s`);
      }
    }
    if (!this[$model]) throw new Error('No model name has been configured');
    return this[$model];
  }

  plural(name) {
    if (name) {
      this[$plural] = name;
    }
    if (!this[$plural]) throw new Error('No plural name has been configured');
    return this[$plural];
  }

  modelRequest() {
    return `get_${this.model()}`;
  }

  pluralRequest() {
    return `get_${this.plural()}`;
  }

  $find(identity) {
    return this.find(identity).$promise();
  }

  find(identity) {
    let createModel = this.client.model(this.model());
    let execRequest = this.client.request(this.modelRequest());
    let model = createModel(execRequest(identity));

    // add the model to this collection only when it is fully loaded
    model.$promise().then(model => this.add);

    // return model synchronously
    return model;
  }

  $findAll(params={}) {
    return this.findAll(params).$promise();
  }

  findAll(params={}) {
    if (!this[$views].has(params)) {
      let execRequest = this.client.request(this.pluralRequest());
      let promise = execRequest(params);
      let view = new View(promise, this, params);
      this[$views].set(params, view);
    }
    return this[$views].get(params);
  }

  add(model) {
    // todo: add to any view of which this matches the filter(?)
    super.set(model.identity(), model);
    this[$views].forEach(view => {
      if (this)
      
    });
    return this;
  }

  remove(model) {
    super.delete(model.identity());
    this[$views].forEach(view => view.remove(model));
    return this;
  }

  set() {
    throw new Error('Cannot `set` on collections. Use `add` instead.');
  }

  delete() {
    throw new Error('Cannot `delete` on collections. Use `remove` instead.');
  }
};
