'use strict';

import * as assert from '../lib/assert';

describe('assert', () => {
  describe('#isFunction', () => {
    it('throws error if arg is not a function', () => {
      expect(() => assert.isFunction()).to.throw();
      expect(() => assert.isFunction('foo')).to.throw();
      expect(() => assert.isFunction({})).to.throw();
    })
    it('noops if arg is a function', () => {
      const arg = () => {};
      expect(() => assert.isFunction(arg)).not.to.throw();
    })
  });
});
