'use strict';

import * as assert from '../lib/assert';

describe('assert', () => {
  describe('#notEmpty', () => {
    context('when given undefined', () => {
      it('throws', () => {
        expect(() => assert.notEmpty()).to.throw(TypeError);
      });
    });
    context('when given null', () => {
      it('throws', () => {
        expect(() => assert.notEmpty(null)).to.throw(TypeError);
      });
    });
    context('when given a string', () => {
      it('throws', () => {
        expect(() => assert.notEmpty('')).to.throw(TypeError);
      });
    });
    context('when given 0', () => {
      it('throws', () => {
        expect(() => assert.notEmpty(0)).to.throw(TypeError);
      });
    });
    context('when given an empty array', () => {
      it('throws', () => {
        expect(() => assert.notEmpty([])).to.throw(TypeError);
      });
    });
  });

  describe('#isString()', () => {
    context('when given a non-string', () => {
      it('throws', () => {
        expect(() => assert.isString(null)).to.throw(TypeError);
        expect(() => assert.isString(1)).to.throw(TypeError);
        expect(() => assert.isString({})).to.throw(TypeError);
      });
    })

    context('when given a string', () => {
      it('does not throw', () => {
        expect(() => assert.isString('')).not.to.throw(TypeError);
      });
    })
  });

  describe('#isFunction()', () => {
    context('when given a non-function', () => {
      it('throws', () => {
        expect(() => assert.isFunction()).to.throw(TypeError);
        expect(() => assert.isFunction('foo')).to.throw(TypeError);
        expect(() => assert.isFunction({})).to.throw(TypeError);
      });
    })

    context('when given a function', () => {
      it('does not throw', () => {
        const arg = () => {};
        expect(() => assert.isFunction(arg)).not.to.throw(TypeError);
      });
    })
  });

  describe('#isDefined()', () => {
    context('when given undefined', () => {
      it('throws', () => {
        expect(() => assert.isDefined()).to.throw(TypeError);
      });
    })

    context('when given a defined value', () => {
      it('does not throw', () => {
        expect(() => assert.isDefined(0)).not.to.throw(TypeError);
        expect(() => assert.isDefined(null)).not.to.throw(TypeError);
        expect(() => assert.isDefined('')).not.to.throw(TypeError);
      });
    })
  });

  describe('#exists', () => {
    it('throws if value is undefined', () => {
      expect(() => assert.exists()).to.throw(TypeError);
    });
    it('throws if value is null', () => {
      expect(() => assert.exists(null)).to.throw(TypeError);
    });
    it('noops if arg exists', () => {
      expect(() => assert.exists('')).not.to.throw(TypeError);
      expect(() => assert.exists(0)).not.to.throw(TypeError);
      expect(() => assert.exists([])).not.to.throw(TypeError);
      expect(() => assert.exists({})).not.to.throw(TypeError);
    });
  });
});
