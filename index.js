'use strict';

const RouteTable = require('./route/table');
const pkg = require('./package.json');

module.exports = (routes, controllerPath) => {
  const plugin = {
    register(server, options, next) {
      const table = new RouteTable(controllerPath);
      routes(table);
      server.route(table.routes);
      next();
    }
  };
  plugin.register.attributes = { pkg };
  return plugin;
};
