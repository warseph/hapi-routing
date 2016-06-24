'use strict';
/* eslint-env node, mocha */
/* global expect, sinon */
/* eslint prefer-arrow-callback: 0 */
/* eslint no-unused-expressions: 0 */

require('../helper');
const RouteBuilder = require('../../route/builder');

describe('RouteBuilder', function () {
  it('should build the provided route', function () {
    class DummyController {
      constructor() {
        DummyController.spy = sinon.spy();
        this.test = DummyController.spy;
      }
    }
    const builder = new RouteBuilder();
    const testRoute = {path: 'test/get', handler: 'test#test', method: 'get'};
    builder.loadController = sinon.spy(() => DummyController);
    const result = builder.build(testRoute);

    expect(result.method).to.eq('GET');
    expect(result.path).to.eq('test/get');
    result.handler();
    expect(DummyController.spy).to.have.been.called;
  });

  it('should build validators if present', function () {
    class DummyController {
      static fakeValidation(method) {
        return method === 'GET';
      }
    }
    const builder = new RouteBuilder();
    const testRoute = {path: 'test/get', handler: 'test#fake', method: 'get'};
    builder.loadController = () => DummyController;
    const result = builder.build(testRoute);

    expect(result.config.validate).to.be.true;
  });
});
