'use strict';
const knex = require('./knex');

const routes = require('./routes');

const Hapi = require('hapi');

const server = Hapi.server({
  port: 3000,
  host: 'localhost',
  router: {
    stripTrailingSlash: true
  }
});

routes.forEach((route) => {
  server.route(route)
});

server.start();
