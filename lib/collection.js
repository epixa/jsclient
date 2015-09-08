'use strict';

import { View } from './view';

const $filters = Symbol('filters');
const $modelName = Symbol('model');
const $pluralName = Symbol('plural');
const $view = Symbol('view');
const $views = Symbol('views');
const $client = Symbol('client');

export class Collection extends Map {
  constructor(client) {
    super();
    this[$client] = client;
    this[$filters] = new Map();
    this[$view] = View;
    this[$views] = new Map();

    !this.init || this.init();
  }

  get client() {
    return this[$client];
  }

  filter(name, Filter) {
    if (Filter) {
      this[$filters].set(name, Filter);
    }
    return this[$filters].get(name);
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
    this[$filters].assertHasAll(Object.keys(params));
    let execRequest = this.client.request(this.pluralRequest());
    return execRequest(params);
  }

  $find(identity) {
    return this.find(identity).$promise();
  }

  find(identity) {
    let promise = this.$rawFetch(identity).$body();
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
    const key = Object.keys(params).sort().join('.');
    if (!this[$views].has(key)) {
      const CollectionView = this.view();
      const promise = this.$rawFetchAll(params).$body();
      const view = new CollectionView(promise, this, params);
      this[$views].set(key, view);
    }
    return this[$views].get(key);
  }

  syncWithViews(model) {
    this[$views].forEach(view => {
      if (view.needs(model)) {
        view.add(model);
      }
    });
  }

  add(model) {
    // todo: add to any view of which this matches the filter(?)
    super.set(model.identity(), model);
    this.syncWithViews(model);
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
