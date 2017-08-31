var mysql = require('mysql');
var jdbc_conn = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'dbapp',
  port: 3306
});
module.exports = jdbc_conn;

