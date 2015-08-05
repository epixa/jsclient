'use strict';

var chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai');

chai.use(sinonChai);

// Need to specify these globally since the webpack loaders do this
// automatically. Makes for less verbose test files at least.
global.expect = chai.expect;
global.sinon = sinon;
