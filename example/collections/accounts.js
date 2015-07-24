'use strict';

import { Collection } from '../collection';
import { AccountsView } from '../views/accounts';

export class Accounts extends Collection {
  init() {
    this.model('account');
    this.plural('accounts'); // optional, default behavior of model() will set this

    this.view(AccountsView); // optional, only necessary if you want a custom View

    this.filter('perPage', (n=50) => `per_page=${n}`);
    this.filter('page', (p=1) => `page=${p}`);
  }
}
