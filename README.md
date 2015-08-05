# JSClient

JS module for building API clients.

## Getting Started
```
$ npm install
```

## Development

JSClient is built using ES6 and made for use in both NodeJS projects as well as in the browser. While developing, you can generate updated bundled and transpiled code using the following commands:

```shell
# Transpile to ES5 (lib/*)
$ npm run transpile

# Bundle to a single file (dist/jsclient.js, dist/jsclient.min.js)
$ npm run build
```

## Running tests

The test suite is set up to run in either a node environment or in a browser:

```shell
# To run the tests in node only
$ npm run test-node

# To run the tests in a browser only
$ npm run test-browser

# To run tests in both node & a browser
$ npm test
```