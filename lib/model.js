'use strict';

import _, { assign } from 'lodash';

const loaded = Symbol('loaded');
const loading = Symbol('loading');
const reloading = Symbol('reloading');
const client = Symbol('client');
const associations = Symbol('associations');
const attributes = Symbol('attributes');
const identityProperty = Symbol('identityProperty');

export class Model {
  constructor(promise, client, collection) {
    this[loaded] = false;
    this[reloading] = null;
    this[identityProperty] = 'id';
    this[loading] = promise.then((data) => {
      return _.assign(this, { loaded: true }).populate(data); // these are intentionally run synchronously
    });
    this[associations] = {};
    this[attributes] = {};

    Object.defineProperty(this, 'client', { value: client });
    Object.defineProperty(this, 'collection', { value: collection });

    !this.init || this.init();
  }

  hasOne(name, options={}) {
    if (this[name]) throw new Error(`An association already exists for ${name}`);
    // todo: deal with options.model replacing name for request
    this[name] = new Proxy(this[associations], {
      get: (target, name) => {
        if (!(name in target)) { // todo: should this really be a once off thing?
          let createModel = this.client.model(name);
          let execRequest = this.client.request(`get_${name}`);
          target[name] = createModel(execRequest(/* todo: pass the current value of this property */));
        }
        return target[name];
      }
      // todo: implement set()
    });
  }

  hasMany(name, options={}) {
    if (this[name]) throw new Error(`An association already exists for ${name}`);
    // todo: deal with options.collection replacing name for request
    this[name] = new Proxy(this[associations], {
      get: (target, name) => {
        if (!(name in target)) {
          let createCollection = this.client.collection(name);
          let execRequest = this.client.request(`get_${name}`);
          target[name] = createCollection(execRequest());
        }
        return target[name];
      }
      // todo: implement set()
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

  identity(name) {
    if (name) {
      this[identityProperty] = name;
    }
    return this[this[identityProperty]];
  }

  $promise() {
    return this[loading];
  }

  // reloads the current instance of the model
  // will not attempt a reload if a reload is already in progress
  $reload() {
    if (!this.loaded()) {
      return this.$promise();
    }
    if (!this.reloading()) {
      this[reloading] = this.collection.$find(this.identity()).then(this.populate);
    }
    return this[reloading];
  }
};
