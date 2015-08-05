'use strict';

import {test} from '../lib/index';

describe('JS Client', () => {
  it('should do something', () => {
    let foo = true;
    expect(foo).to.be.true;
    expect(test).to.equal('foo');
  });
});
