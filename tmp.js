'use strict';

import core from "./lib/core";

let client = core.client.new({ url: '/api/path' });



let accounts = client.collection('accounts');
accounts.url() === 'http://api.example.com/accounts';

accounts.$findAll(); // returns promise that is fulfilled by view
let view = accounts.findAll();  // returns a view
view === accounts.findAll(); // views with same args are memoized locally to the collection

let viewWith50 = accounts.findAll({ per_page: 50 });
view !== viewWith50;  // views are uniquely defined by their given arguments

/*
Collection views are similar to collections except that you cannot alter the
filters that are applied to a view after instantiation, and operations on the
view are also applied to the overall collection.
*/
view.$promise()  // a promise that is fulfilled with the view when it is loaded
view.loaded()    // whether the view is loaded yet
view.$reload()   // returns a promise to reload the current view
view.reloading() // whether the view is reloading right now

// the side effects of functions such as $load, $reload, add, delete, etc. all
// proxy back to collection as well
view.add(somevar);
accounts.has(somevar) === true















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
