'use strict';

const Controller = require('../../controller');

module.exports = class TestController extends Controller {
  index() {
    this.reply(this.request.params.test === 'test' ? 'ok!' : 'wrong param!');
  }
};
