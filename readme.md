# HapiRouting

This plugins adds a pretty simple and easy to use routing & controllers in hapi

# Installation
```
$ npm install --save hapi-routing
```

# Usage
You need to create a route file, like this:

```js
// routes.js
'use strict';

module.exports = table => table
  .get('/first-url', 'first#index')
  .post('/second-url', 'second#index')
  .match('/third-url/{param}', 'third#anotherAction', 'get', 'put', 'patch')
;
```

And register the module in the hapi server using that route:
```js
hapiRouting = require('hapi-routing');
routes = require('./routes');
// hapi initialization code

hapi.register(hapiRouting(routes));

// additional hapi code, and hapi.start call
```

```js
// controllers/first
module.exports = class FirstController {
  index(request, reply) {
    reply('OK!');
  }
}
```

# Api

## `hapiRouting(routes, [controllerPath])`
- `routes` must be a function that will receive a RouteTable
- `controllerPath` is the path to the controllers (called with
  `require.main.require`). You can also pass an absolute path. The default
  value is `./controllers`

It returns the plugin configuration to load it with `hapi.register`

## `RouteTable`
This is the object passed to the routes function. It has several functions,
which should be chained to specify the routes (they all return the `RouteTable`
object).
### `[delete|get|head|patch|post|put](url, handler)`
Utility methods to define a route with the specified method.
- `url` is a url in the same format as hapi default routes
- `handler` is a string composed of 'controllerName#actionName'

### `match(url, handler, ...methods)`
Defines a route that replies to more than one method
- `url` is a url in the same format as hapi default routes
- `handler` is a string composed of 'controllerName#actionName'
- `method` a string with the method name

## `Controller`
It's a simple class that must have defined a method for every action in your
routing table. Each action receives hapi's `request` and `reply` objects as
parameters.
# Validation
If you want to add hapi validation to an action, you need to create a static
method in your controller called actionNameValidation that will receive a method
(in string, uppercase) and should return the Joi validation configuration.
```js
// controllers/third
const Joi = require('joi');

module.exports = class ThirdController {
  anotherAction(request, reply) {
    reply('OK!');
  }

  static anotherActionValidation(method) {
    switch (method) {
      case 'PUT':
      case 'PATCH':
        return {
          params: {
            param: Joi.string().required()
          }
        };
    }
  }
}
```
