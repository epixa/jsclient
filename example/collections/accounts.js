'use strict';

import { Collection } from '../collection';
import { Filter } from '../../lib/collection/filter';
import { AccountsView } from '../views/accounts';

export class Accounts extends Collection {
  init() {
    this.model('account');
    this.plural('accounts'); // optional, default behavior of model() will set this

    this.view(AccountsView); // optional, only necessary if you want a custom View

    // todo: filters should be stored in individual files
    this.filter('page', class PageFilter extends Filter {
      matches(model, value) {
        const first = this.view.first();
        const last = this.view.last();
        return model.created_at > first && model.created_at < last;
      }
    });

    this.filter('per_page', class PerPageFilter extends Filter {
      matches(model, size) {
        return this.createdWithin(model) || this.canBeAppended(model, size);
      }

      canBeAppended(model, size) {
        return this.createdAfter(model) && this.roomFor(size);
      }

      createdWithin(model) {
        const first = this.view.first();
        const last = this.view.last();
        return model.created_at > first && model.created_at < last;
      }

      createdAfter(model) {
        const last = this.view.last();
        return model.created_at >= last;
      }

      roomFor(size) {
        return this.view.size < size;
      }
    });
  }
}
