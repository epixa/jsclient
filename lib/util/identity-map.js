'use strict';

import * as assert from '../assert';

class IdentityMap extends Map {
  add(obj) {
    assert.isFunction(obj.identity);

    super.set(obj.identity(), obj);
    return this;
  }

  remove(obj) {
    super.delete(obj.identity());
    return this;
  }

  set() {
    throw new Error('Cannot `set` on IdentityMap. Use `add` instead.');
  }

  delete() {
    throw new Error('Cannot `delete` on IdentityMap. Use `remove` instead.');
  }
}
