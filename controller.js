'use strict';

module.exports = class Controller {
  constructor(request, reply) {
    this.request = request;
    this.reply = reply;
  }
};
