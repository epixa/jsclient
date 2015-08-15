'use strict';

import { IdentityMap } from './util/identity-map';
import { isArray } from './util/type-checks';

export class Filters extends IdentityMap {
  hasAll(identities) {
    return identities.every(i => this.has(i));
  }

  assertHasAll(identities) {
    if (!this.hasAll(identities)) {
      const missingFilters = identities.filter(i => !this.has(i));
      const missing = missingFilters.join(', ');
      throw new Error(`Some filters were not configured: ${missing}`);
    }
  }
}
