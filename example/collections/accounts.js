'use strict';

import { Collection } from '../collection';

export class Accounts extends Collection {
  init() {
    this.modelName = 'account';
    this.modelRequest = 'get_account';
    this.collectionName = 'accounts';
    this.collectionRequest = 'get_accounts';
  }
}
