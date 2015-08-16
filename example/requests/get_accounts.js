'use strict';

import { Request } from '../request';

export class GetAccounts extends Request {
  init() {
    this.path = '/accounts';
  }
}
