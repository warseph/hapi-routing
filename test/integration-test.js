'use strict';
/* eslint-env node, mocha */
/* global expect, sinon */
/* eslint prefer-arrow-callback: 0 */
/* eslint no-unused-expressions: 0 */

require('./helper');
const Hapi = require('hapi');
const hapiRouting = require('../index');
const http = require('request');

describe('HapiRouting', function () {
  it('should register the routes in hapi', function () {
    const routes = table => table.get('/{test}', 'test#index');
    const server = new Hapi.Server();
    server.connection();
    server.register(hapiRouting(routes, `${__dirname}/test-data`));
    return server.start()
      .then(() => server.info.uri)
      .then(uri => new Promise((resolve, reject) => http.get(`${uri}/test`,
        (e, r) => e && reject(e) || resolve(r))))
      .then(res => expect(res.body).to.eq('ok!'));
  });
});
