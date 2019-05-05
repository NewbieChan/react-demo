const { exec } = require('../db/mysql');

const login = (username, password) => {
  const sql = `
    select username, realname from tbl_users where username='${username}' and password='${password}'
  `;
  return exec(sql);
}

const register = (username, password, realname) => {
  const sql = ` insert into tbl_users (username, password, realname) 
  values ('${username}', '${password}', '${realname}')`;
  return exec(sql);
}

module.exports = {
  login,
  register,
};
