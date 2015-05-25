'use strict';

import _, { assign } from 'lodash';
import Promise, { defer } from 'bluebird';

const deferred = Symbol('deferred');
const loaded = Symbol('loaded');
const reloading = Symbol('reloading');
const requests = Symbol('requests');

export default class Model {
  constructor() {
    this[deferred] = Promise.defer();
    this[requests] = new Map();
    this[loaded] = false;
    this[reloading] = null;
  }

  self() {
    return this;
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

  $request(type) {
    if (!this[requests].get(type)) {
      throw new Error(`No request exists for ${type}`);
    }
    return this[requests].get(type); // how to expose headers? should we even bother?
  }

  // todo: make this only settable once
  // should this only be settable via the constructor?
  $promise(promise) {
    if (promise) {
      promise = promise.then((data) => {
        return makeAsLoaded(this).populate(data); // these are intentionally run synchronously
      });
      this[deferred].resolve(promise);
    }
    return this[deferred].promise;
  }

  // reloads the current instance of the model
  // will not attempt a reload if a reload is already in progress
  // todo: do not attempt reload if initial load is in progress either
  $reload() {
    if (!this.reloading()) {
      this[reloading] = this.$request('reload').then(this.populate);
    }
    return this[reloading].then(this.self);
  }

  // updates the current instance of the model
  // chains off of loading promise
  // fulfilled by self after being populated from response
  $update(data) {
    this.populate(data); // populate right away with whatever it was given
    return this.$promise().then(this.$request('update')).then(this.populate);
  }

  // issues a request to delete the record for this model
  // chains off of loading promise
  // fullfilled by whatever the request returns
  $delete() {
    return this.$promise().then(this.$request('delete'));
  }
};

function makeAsLoaded(model) {
  model[loaded] = true;
  return model;
}
