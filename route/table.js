'use strict';

const RouteBuilder = require('./builder');

module.exports = class RouteTable {
  constructor(controllerPath) {
    this._routes = [];
    this.builder = new RouteBuilder(controllerPath);
  }

  delete(path, handler) {
    return this.match(path, handler, 'delete');
  }

  get(path, handler) {
    return this.match(path, handler, 'get');
  }

  head(path, handler) {
    return this.match(path, handler, 'head');
  }

  patch(path, handler) {
    return this.match(path, handler, 'patch');
  }

  post(path, handler) {
    return this.match(path, handler, 'post');
  }

  put(path, handler) {
    return this.match(path, handler, 'put');
  }

  match(path, handler /* methods... */) {
    const methods = [].slice.call(arguments, 2);
    methods.forEach(method => this._routes.push({path, handler, method}));
    return this;
  }

  get routes() {
    return this._routes.map(route => this.builder.build(route));
  }
};
