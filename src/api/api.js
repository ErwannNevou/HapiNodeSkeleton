'use strict';

var Hapi = require('hapi');
var Swaggerize = require('swaggerize-hapi');

module.exports = function (packageJson, PORT) {
  var server = new Hapi.Server();

  server.connection({
    port: PORT
  });

  server.register({
    register: Swaggerize,
    options: {
      api: require('./definition')(packageJson),
      docspath: '/api/definition.json',
      handlers: require('./handlers')
    }
  }, function (swaggerizeRegistrationError) {
    assert(_.isUndefined(swaggerizeRegistrationError));
  });

  return server;
};
