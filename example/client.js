'use strict';

import { Client as BaseClient } from '../lib/client';
import * as collections from './collections';
import * as models from './models';
import * as requests from './requests';

export class Client extends BaseClient {
  init() {
    this.collections(collections);
    this.models(models);
    this.requests(models);
  }
}
