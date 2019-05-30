const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'gracekimotho',
    password: '',
    database: 'smsAPI'
  }
});

module.exports =  knex;
