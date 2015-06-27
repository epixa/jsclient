'use strict';

import _, { assign } from 'lodash';
import { Association } from './association';

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
    let model = options.model ? options.model : name;

    let getModel = val => {
      let createModel = this.client.model(model);
      let execRequest = this.client.request(`get_${model}`);
      return createModel(execRequest(val));
    };

    this.defineAssociation(name, new Association(getModel));
  }

  hasMany(name, options={}) {
    let collection = options.collection ? options.collection : name;

    let getCollection = val => {
      let createCollection = this.client.collection(collection);
      let execRequest = this.client.request(`get_${collection}`);
      return createCollection(execRequest(val));
    };

    this.defineAssociation(name, new Association(getCollection));
  }

  defineAssociation(name, association) {
    if (this[associations][name]) {
      throw new Error(`An association already exists for ${name}`);
    }

    Object.defineProperty(this, name, {
      enumerable: true,
      configurable: false,
      get: association.getter.bind(association),
      set: association.setter.bind(association)
    });
  }

  attribute(name, options={}) {
    if (this[attributes][name]) throw new Error(`Attribute ${name} is already defined`);

    // todo: deal with type

    let originalValue = this[name];
    let defaultValue = defaultValue in options ? options.defaultValue : null;

    Object.defineProperty(this, name, {
      enumerable: true,
      configurable: false,
      get: () => this[attributes][name],
      set: (val=defaultValue) => this[attributes][name] = val
    });

    this[name] = originalValue;
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
}
