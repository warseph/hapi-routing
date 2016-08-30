'use strict';

module.exports = class TestController {
  index(request, reply) {
    reply(request.params.test === 'test' ? 'ok!' : 'wrong param!');
  }
};
