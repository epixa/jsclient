'use strict';

import core from "./lib/core";

let client = core.client.new({ url: '/api/path' });



let account = client.accounts.find('/accounts/123'); // GET
client.accounts.$find('/accounts/123').then(function(result) { // GET, but returns promise
  account = result;
});
account.$update();  // PUT
account.$delete();  // DELETE
account.$reload();  // GET


client.accounts.$create({ name: 'something' }).then(function(result) { // POST
  account = result;
});
let accounts = client.accounts.findAll('/accounts'); // GET
accounts = client.accounts.findAll('/accounts', { user: 321 }); // GET with query parameters
client.accounts.$findAll('/accounts').then(function(result) {  // GET, but returns promise
  accounts = result;
});
accounts.map(); // it's a regular array
accounts.$promise(); // but it has a promise?
accounts.$promise().map() // bluebird promise... can it be?

// pagination.
// caching.

// ???

client.accounts.use(function(data, next) {
  next(data.accounts);
});

client.account.use(function(data, next) {
  next(data.accounts);
});
