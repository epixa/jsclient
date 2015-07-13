'use strict';

import { View } from './view';

const loaded = Symbol('loaded');
const loading = Symbol('loading');
const reloading = Symbol('reloading');
const model = Symbol('model');
const plural = Symbol('plural');
const views = Symbol('views');

export class Collection extends Map {
  constructor(promise, client) {
    this[loaded] = false;
    this[reloading] = null;
    this[views] = new Map();
    this[loading] = promise // todo: Promise.resolve() this
      .then(resources => {
        let createModel = this.client.model(this.model());
        return resources.map(createModel.bind(createModel));
      })
      .then(fulfillModelPromises)
      .then(models => {
        this[loaded] = true;
        models.forEach(model => {
          this.set(model.identity(), model);
        });
      });

    Object.defineProperty(this, 'client', { value: client });

    !this.init || this.init();
  }

  model(name) {
    if (name) {
      this[model] = name;
      if (!this[plural]) {
        this.plural(`${name}s`);
      }
    }
    if (!this[model]) throw new Error('No model name has been configured');
    return this[model];
  }

  plural(name) {
    if (name) {
      this[plural] = name;
    }
    if (!this[plural]) throw new Error('No plural name has been configured');
    return this[plural];
  }

  modelRequest() {
    return `get_${this.model()}`;
  }

  pluralRequest() {
    return `get_${this.plural()}`;
  }

  loaded() {
    return this[loaded];
  }

  reloading() {
    return !!this[reloading];
  }

  $promise() {
    return this[loading];
  }

  // reloads the current collection
  // will not attempt a reload if a reload is already in progress
  $reload() {
    if (!this.loaded()) {
      return this.$promise();
    }
    if (!this.reloading()) {
      this[reloading] = this.collection.$findAll().then(this.populate);
    }
    return this[reloading];
  }

  $find(identity) {
    return this.find(identity).$promise();
  }

  find(identity) {
    let createModel = this.client.model(this.model());
    let execRequest = this.client.request(this.modelRequest());
    return createModel(execRequest(identity));
  }

  $load(params={}) {
    return this.load(params).$promise();
  }

  load(params={}) {
    if (!this[views].has(params)) {
      let view = new View(this, params);
      this[views].set(params, view);
    }
    return this[views].get(params);
  }

  add(model) {
    // todo: add to any view of which this matches the filter(?)
    super.set(model.identity(), model);
    this[views].forEach(view => {
      if (this)
      
    });
    return this;
  }

  remove(model) {
    super.delete(model.identity());
    this[views].forEach(view => view.remove(model));
    return this;
  }

  set() {
    throw new Error('Cannot `set` on collections. Use `add` instead.');
  }

  delete() {
    throw new Error('Cannot `delete` on collections. Use `remove` instead.');
  }
};

function fulfillModelPromises(models) { // todo: expose as static?
  return models.map(m => m.$promise()); // todo: Promise.all()
}
