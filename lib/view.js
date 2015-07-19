'use strict';

const $loaded = Symbol('loaded');
const $loading = Symbol('loading');
const $params = Symbol('params');
const $reloading = Symbol('reloading');
const $model = Symbol('model');
const $plural = Symbol('plural');
const $collection = Symbol('collection');

export default class View extends Map {
  constructor(promise, collection, params) {
    this[$collection] = collection;
    this[$params] = params;
    this[$loaded] = false;
    this[$reloading] = null;
    this[$model] = null;
    this[$plural] = null;
    this[$loading] = promise
      .then(resources => {
        let createModel = this.client.model(this.model());
        return resources.map(createModel.bind(createModel));
      })
      .then(fulfillModelPromises)
      .then(models => {
        this[$loaded] = true;
        models.forEach(model => {
          this.set(model.identity(), model);
        });
      });

    !this.init || this.init();
  }

  get client() {
    return this.collection.client;
  }

  get collection() {
    return this[$collection];
  }

  get params() {
    return this[$params];
  }

  loaded() {
    return this[$loaded];
  }

  reloading() {
    return !!this[$reloading];
  }

  $promise() {
    return this[$loading];
  }

  // reloads the current view
  // will not attempt a reload if a reload is already in progress
  $reload() {
    if (!this.loaded()) {
      return this.$promise();
    }
    if (!this.reloading()) {
      let execRequest = this.client.request(this.collection.pluralRequest());
      this[$reloading] = execRequest(this.params()).then(data => populate(this, data));
    }
    return this[$reloading];
  }

  add(model) {
    super.set(model.identity(), model);
    return this;
  }

  remove(model) {
    super.delete(model.identity());
    return this;
  }

  set() {
    throw new Error('Cannot `set` on views. Use `add` instead.');
  }

  delete() {
    throw new Error('Cannot `delete` on views. Use `remove` instead.');
  }
}

function populate(collection, data) {
  // todo: how does data become models?
  return collection;
}

function fulfillModelPromises(models) { // todo: expose as static?
  return models.map(m => m.$promise()); // todo: Promise.all()
}
