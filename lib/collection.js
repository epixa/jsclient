'use strict';

export class Collection {
  $find(identity) {
    return this.find(identity).$promise();
  }

  find(identity) {
    let createModel = this.client.model(this.modelName);
    let execRequest = this.client.request(this.modelRequest);
    return createModel(execRequest(identity));
  }

  $findAll(params={}) {

  }

  remove(model) {
    return this;
  }
};
