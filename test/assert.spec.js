'use strict';

import * as assert from '../lib/assert';

describe('assert', () => {
  describe('#isFunction()', () => {
    context('when given a non-function', () => {
      it('throws', () => {
        expect(() => assert.isFunction()).to.throw();
        expect(() => assert.isFunction('foo')).to.throw();
        expect(() => assert.isFunction({})).to.throw();
      });
    })

    context('when given a function', () => {
      it('does not throw', () => {
        const arg = () => {};
        expect(() => assert.isFunction(arg)).not.to.throw();
      });
    })
  });

  describe('#isDefined()', () => {
    context('when given undefined', () => {
      it('throws', () => {
        expect(() => assert.isDefined()).to.throw();
      });
    })

    context('when given a defined value', () => {
      it('does not throw', () => {
        expect(() => assert.isDefined(0)).not.to.throw();
        expect(() => assert.isDefined(null)).not.to.throw();
        expect(() => assert.isDefined('')).not.to.throw();
      });
    })
  });

  describe('#exists', () => {
    it('throws if value is undefined', () => {
      expect(() => assert.exists()).to.throw();
    });
    it('throws if value is null', () => {
      expect(() => assert.exists(null)).to.throw();
    });
    it('noops if arg exists', () => {
      expect(() => assert.exists('')).not.to.throw();
      expect(() => assert.exists(0)).not.to.throw();
      expect(() => assert.exists([])).not.to.throw();
      expect(() => assert.exists({})).not.to.throw();
    });
  });
});
