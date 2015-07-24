'use strict';

import { Collection } from '../collection';

export class Accounts extends Collection {
  init() {
    this.model('account');
    this.plural('accounts'); // optional, default behavior of model() will set this

    this.filter('perPage', (n=50) => `per_page=${n}`);
    this.filter('page', (p=1) => `page=${p}`);
  }
}
