'use strict';

import { Client as BaseClient } from '../lib/client';

export class Client extends BaseClient {
  init() {
    this.collections([
      'accounts',
      'users'
    ]);

    this.models([
      'account',
      'user'
    ]);

    this.requests([
      'cancel_account',
      'create_account',
      'create_user',
      'get_account',
      'get_user',
      'get_accounts',
      'get_users',
      'update_account',
      'update_user'
    ]);
  }
}
