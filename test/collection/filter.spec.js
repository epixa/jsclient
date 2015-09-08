'use strict';

import { Filter } from '../../lib/collection/filter';

let view;
let filter;

describe('Filter', () => {
  beforeEach(() => {
    view = {};
    filter = new Filter(view);
  });

  describe('constructor', () => {
    it('sets #view', () => {
      expect(filter.view).to.equal(view);
    })
  })

  describe('#view', () => {
    it('is readonly', () => {
      expect(() => filter.view = {}).to.throw();
    })
  })

  describe('#matches()', () => {
    it('throws by default (must be overwritten)', () => {
      expect(filter.matches).to.throw();
    })
  })
});
