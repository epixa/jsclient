'use strict';

import { Model } from '../model';
import { datetime, flag } from '../model/types';

export class Account extends Model {
  init() {
    this.attribute('name');
    this.attribute('created_at', { datetime });
    this.attribute('updated_at', { datetime });
    this.attribute('active', { flag });
    this.hasMany('users');
    this.hasOne('owner', { model: 'user' });
  }

  $pendingUsers() {
    return this.users.$pending();
  }

  isActive() {
    return this.active;
  }

  hasBeenUpdated() {
    return !!this.updated_at;
  }
}
