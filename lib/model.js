'use strict';

import _, { assign } from 'lodash';

const loaded = Symbol('loaded');
const loading = Symbol('loading');
const reloading = Symbol('reloading');
const actions = Symbol('actions');
const client = Symbol('client');
const associations = Symbol('associations');

export class Model {
  constructor(promise, client, collection) {
    this[actions] = new Map();
    this[loaded] = false;
    this[reloading] = null;
    this[loading] = promise.then((data) => {
      return makeAsLoaded(this).populate(data); // these are intentionally run synchronously
    });
    this[associations] = {};
    this[attributes] = {};
    this.client = client; // make non-enumerable
    this.collection = collection; // make non-enumerable

    !this.init || this.init();
  }

  hasOne(name, options={}) {
    if (this[name]) throw new Error(`An association already exists for ${name}`);
    // todo: deal with options.model
    this[name] = new Proxy(this[associations], {
      get: (target, name) => {
        if (!(name in target)) {
          let createModel = this.client.model(name)
          let execRequest = this.client.request(`get_${name}`);
          target[name] = createModel(execRequest());
        }
        return target[name];
      }
      // todo: implement set()
    });
  }

  hasMany(name, options={}) {
    if (this[name]) throw new Error(`An association already exists for ${name}`);
    // todo: deal with options.collection
    this[name] = new Proxy(this[associations], {
      get: (target, name) => {
        if (!(name in target)) {
          let createCollection = this.client.collection(name)
          let execRequest = this.client.request(`get_${name}`);
          target[name] = createCollection(execRequest());
        }
        return target[name];
      }
      // todo: implement set(), maybe
    });
  }

  attribute(name, options={}) {
    if (this[name]) throw new Error(`Attribute ${name} is already defined`);
    this[attributes][name] = typeof options.defaultValue !== 'undefined'
                           ? options.defaultValue : null;
    // todo: deal with type
    // todo: deal with nullable
    Object.defineProperty(this, name, {
      enumerable: true,
      configurable: false,
      get: () => this[attributes][name],
      set: (val) => this[attributes][name] = val
    });
  }

  populate(data) {
    return _.assign(this, data || {});
  }

  loaded() {
    return this[loaded];
  }

  reloading() {
    return !!this[reloading];
  }

  $action(type) {
    if (!this[actions].get(type)) {
      throw new Error(`No action exists for ${type}`);
    }
    return this[actions].get(type);
  }

  $promise() {
    return this[loading];
  }

  // todo: refactor all of this $actions stuff below

  // reloads the current instance of the model
  // will not attempt a reload if a reload is already in progress
  $reload() {
    if (!this.loaded) {
      return this.$promise();
    }
    if (!this.reloading()) {
      this[reloading] = this.$action('reload').then(this.populate);
    }
    return this[reloading];
  }

  // updates the current instance of the model
  // chains off of loading promise
  // fulfilled by self after being populated from response
  $update(data) {
    this.populate(data); // populate right away with whatever it was given
    return this.$promise().then(this.$action('update')).then(this.populate);
  }

  // issues a action to delete the record for this model
  // chains off of loading promise
  // fullfilled by whatever the action returns
  $delete() {
    return this.$promise().then(this.$action('delete'));
  }
};

function makeAsLoaded(model) {
  model[loaded] = true;
  return model;
}
