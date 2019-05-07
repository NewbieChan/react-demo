const mysql = require('mysql');
const { MYSQL_CONFIG } = require('../config');

module.exports = {
  exec: (sql) => {
    const con = mysql.createConnection(MYSQL_CONFIG);
    return new Promise((resolve, reject) => {
      con.query(sql, (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
        con.end();
      });
    });
  },
  escape: mysql.escape,
}
