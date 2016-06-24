'use strict';
/* eslint-env node, mocha */
/* global expect */
/* eslint prefer-arrow-callback: 0 */

require('../helper');
const RouteTable = require('../../route/table');

describe('RouteTable', function () {
  it('should allow creating route tables', function () {
    const table = new RouteTable();
    table
      .get('test/get', 'test#get')
      .post('test/post', 'test#post')
      .delete('test/delete', 'test#delete')
      .head('test/head', 'test#/head')
      .patch('test/patch', 'test#/patch')
      .post('test/post', 'test#/post')
      .put('test/put', 'test#/put')
      .match('test/match', 'test#match', 'get', 'post');

    expect(table._routes).to.deep.eq([
      {path: 'test/get', handler: 'test#get', method: 'get'},
      {path: 'test/post', handler: 'test#post', method: 'post'},
      {path: 'test/delete', handler: 'test#delete', method: 'delete'},
      {path: 'test/head', handler: 'test#/head', method: 'head'},
      {path: 'test/patch', handler: 'test#/patch', method: 'patch'},
      {path: 'test/post', handler: 'test#/post', method: 'post'},
      {path: 'test/put', handler: 'test#/put', method: 'put'},
      {path: 'test/match', handler: 'test#match', method: 'get'},
      {path: 'test/match', handler: 'test#match', method: 'post'}
    ]);
  });
});
