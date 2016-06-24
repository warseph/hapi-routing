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
Controllers must inherit from `'hapi-routing/controller'`
```js
// controllers/first
const Controller = require('hapi-routing/controller');

module.exports = class FirstController extends Controller {
  index() {
    this.reply('OK!');
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
This class has two properties: `request`, `reply` which correspond to hapi's
objects.
The controllers are instantiated each time a new request is received, so using
`this` in this context will only reference the controller for the current
request.

In case you need to extend the constructor, `Controller`'s constructor will
receive `request`, `reply`, so make sure to add those two parameters first,
and to pass them to `super`.

# Validation
If you want to add hapi validation to an action, you need to create a static
method in your controller called actionNameValidation that will receive a method
(in string, uppercase) and should return the Joi validation configuration.
```js
// controllers/third
const Joi = require('joi');
const Controller = require('hapi-routing/controller');

module.exports = class ThirdController extends Controller {
  anotherAction() {
    this.reply('OK!');
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
