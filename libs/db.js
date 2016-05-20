var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    port     :  3306,
    user     : 'root',
    database : 'blog'
  },
  pool: {
    min: 0,
    max: 7
  }
});

module.exports = knex;
