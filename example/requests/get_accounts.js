'use strict';

export default class GetAccounts extends Request {
  init() {
    this.use((req, res) => {

    });
  }

  $send() {
    return this.client.$send({
      method: 'get',
      url: 'http://localhost/accounts'
    });
  }
}

// $send returns a ResponsePromise
const promise = new Response(xhrPromise);
promise.$data() === promise.then(response => response.data);
promise.$status() === promise.then(response => response.statusCode);
promise.$headers() === promise.then(response => response.headers);
promise.then();



export default function getAccounts(params={}) {
  query
  return this.request({
    params,
    query,
    url,
    path: `accounts/${id}`
  });
}
