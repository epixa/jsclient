'use strict';

import { View } from './view';

const $modelName = Symbol('model');
const $pluralName = Symbol('plural');
const $view = Symbol('view');
const $views = Symbol('views');
const $client = Symbol('client');

export class Collection extends Map {
  constructor(client) {
    this[$client] = client;
    this[$view] = View;
    this[$views] = new Map();

    !this.init || this.init();
  }

  get client() {
    return this[$client];
  }

  modelName(name) {
    if (name) {
      this[$modelName] = name;
      if (!this[$pluralName]) {
        this.pluralName(`${name}s`);
      }
    }
    if (!this[$modelName]) throw new Error('No model name has been configured');
    return this[$modelName];
  }

  pluralName(name) {
    if (name) {
      this[$pluralName] = name;
    }
    if (!this[$pluralName]) throw new Error('No plural name has been configured');
    return this[$pluralName];
  }

  view(view) {
    if (view) {
      if (!(view instanceof View)) throw new Error('Given view is not an instance of View');
      this[$view] = view;
    }
    return this[$view];
  }

  modelRequest() {
    return `get_${this.modelName()}`;
  }

  pluralRequest() {
    return `get_${this.pluralName()}`;
  }

  modelFactory(promise) {
    const getModel = this.client.model(this.modelName());
    return getModel(promise);
  }

  $rawFetch(identity) {
    let execRequest = this.client.request(this.modelRequest());
    return execRequest(identity);
  }

  $rawFetchAll(params={}) {
    let execRequest = this.client.request(this.pluralRequest());
    return execRequest(params);
  }

  $find(identity) {
    return this.find(identity).$promise();
  }

  find(identity) {
    let promise = this.$rawFetch(identity);
    let model = this.modelFactory(promise);

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
      let CollectionView = this.view();
      let promise = this.$rawFetchAll(params);
      let view = new CollectionView(promise, this, params);
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
