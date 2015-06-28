'use strict';

import { Collection } from '../collection';

export class Accounts extends Collection {
  init() {
    this.model('account');
    this.plural('accounts'); // optional, default behavior of model() will set this
  }
}
