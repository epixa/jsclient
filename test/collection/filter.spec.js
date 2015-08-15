'use strict';

import { Filter } from '../../lib/collection/filter';

let identity;
let callback;
let filter;

describe('Filter', () => {
  beforeEach(() => {
    identity = 123;
    callback = function() {};
  });

  describe('constructor', () => {
    context('when identity is defined', () => {
      it('sets #identity', () => {
        filter = new Filter(identity, callback);
        expect(filter.identity).to.equal(identity);
      })
    })

    context('when identity is undefined', () => {
      it('throws', () => {
        expect(() => new Filter(undefined, callback)).to.throw();
      })
    })

    context('when callback is not function', () => {
      it('throws', () => {
        expect(() => new Filter(identity)).to.throw();
        expect(() => new Filter(identity, {})).to.throw();
      })
    })

    context('when callback is a function', () => {
      it('sets #callback', () => {
        filter = new Filter(identity, callback);
        expect(filter.callback).to.equal(callback);
      });
    })
  })

  describe('#identity', () => {
    it('is readonly', () => {
      filter = new Filter(identity, callback);
      expect(filter.identity).to.equal(identity);
      expect(() => filter.identity = 'foo').to.throw();
    })
  })

  describe('#callback', () => {
    it('is readonly', () => {
      filter = new Filter(identity, callback);
      expect(filter.callback).to.equal(callback);
      expect(() => filter.callback = function() {}).to.throw();
    })
  })
});
