'use strict';

const $loaded = Symbol('loaded');
const $loading = Symbol('loading');
const $params = Symbol('params');
const $reloading = Symbol('reloading');
const $model = Symbol('model');
const $plural = Symbol('plural');
const $collection = Symbol('collection');

// todo: figure out how to do custom views

export default class View extends Map {
  constructor(promise, collection, params) {
    this[$collection] = collection;
    this[$params] = params;
    this[$loaded] = false;
    this[$reloading] = null;
    this[$model] = null;
    this[$plural] = null;
    this[$loading] = promise // todo: Promise.resolve()
      .then(resources => resources.map(this.collection.modelFactory))
      .then(fulfillModelPromises)
      .then(models => loadWithModels(this, models));

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

  $rawFetchAll() {
    return this.collection.$rawFetchAll(this.params());
  }

  // reloads the current view
  // will not attempt a reload if a reload is already in progress
  $reload() {
    if (!this.loaded()) {
      return this.$promise();
    }
    if (!this.reloading()) {
      this[$reloading] = this.$rawFetchAll().then(this.populate);
    }
    return this[$reloading];
  }

  populate(data=[]) {
    data.map(this.collection.modelFactory).forEach(this.add);
    return this;
  }

  add(model) {
    this.collection.add(model);
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

function fulfillModelPromises(models) {
  return models.map(model => model.$promise()); // todo: Promise.all()
}

function loadWithModels(collection, models) {
  collection[$loaded] = true;
  models.forEach(model => collection.set(model.identity(), model));
  return collection;
}
