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

  describe('#notEmpty', () => {
    it('throws if value is null', () => {
      expect(() => assert.notEmpty(null)).to.throw();
    });
    it('throws if value is undefined', () => {
      expect(() => assert.notEmpty()).to.throw();
    });
    it('throws if value is empty string', () => {
      expect(() => assert.notEmpty('')).to.throw();
    });
    it('throws if value is 0', () => {
      expect(() => assert.notEmpty(0)).to.throw();
    });
    it('throws if value is an empty array', () => {
      expect(() => assert.notEmpty([])).to.throw();
    });
    it('noops if arg is not empty', () => {
      expect(() => assert.notEmpty('foo')).not.to.throw();
      expect(() => assert.notEmpty(1)).not.to.throw();
      expect(() => assert.notEmpty([1])).not.to.throw();
    });
  });

  describe('#isString', () => {
    it('throws if arg is not a string', () => {
      expect(() => assert.isString()).to.throw();
      expect(() => assert.isString(null)).to.throw();
      expect(() => assert.isString(123)).to.throw();
      expect(() => assert.isString({})).to.throw();
    });
    it('noops if arg is a string', () => {
      expect(() => assert.isString('')).not.to.throw();
    });
  });
});
