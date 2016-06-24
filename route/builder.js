'use strict';

const util = require('util');

module.exports = class RouteBuilder {
  constructor(location) {
    this.location = location || './controllers';
  }

  build(route) {
    const parsed = this.parse(route.handler);
    const Controller = parsed.Controller;
    const action = parsed.action;
    const method = route.method.toUpperCase();
    const builtRoute = {
      method,
      path: route.path,
      handler(request, reply) {
        const controller = new Controller(request, reply);
        return controller[action]();
      },
      config: {}
    };

    this.validator(Controller, action, method)(builtRoute.config);

    return builtRoute;
  }

  parse(handler) {
    const splitted = handler.split('#');
    const Controller = this.loadController(splitted[0]);
    const action = splitted[1];
    return {Controller, action};
  }

  loadController(name) {
    /* eslint global-require: 0 */
    return require.main.require(`${this.location}/${name}`);
  }

  validator(Controller, action, method) {
    const validator = `${action}Validation`;
    if (util.isFunction(Controller[validator])) {
      return config => { config.validate = Controller[validator](method); };
    }
    return () => null;
  }
};
