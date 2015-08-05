// Test entry file that pulls in all the spec files. Keeps tests to a single
// bundle, and allows us to use webpack in the tests.
//
// http://nicolasgallagher.com/how-to-test-react-components-karma-webpack/

var context = require.context('../', false, /.+\_spec\.js?$/);
context.keys().forEach(context);
module.exports = context;
