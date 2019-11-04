const { exec } = require('../db/mysql');

// 获取博客列表
const getList = (author, keyword, pageNo, pageSize) => {
  let sql = `
    select id, title, content, create_at, author, (select count(1) from tbl_blogs where status=1 and author='${author}') as total from tbl_blogs where status=1 `;
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `or title like %${keyword}%`;
  }
  sql += ` order by create_at desc limit ${(pageNo - 1) * pageSize},${pageSize}`;
  return exec(sql);
}

const getDetail = (id) => {
  const sql = `select id, title, content, create_at, author from tbl_blogs where id = '${id}'`;
  return exec(sql);
}

const addBlog = (author, title, content) => {
  const now = Date.now();
  const sql = `
    insert into tbl_blogs (title, content, create_at, author) 
    values ('${title}', '${content}', ${now}, '${author}')
  `
  return exec(sql);
}

const updateBlog = (id, title, content) => {
  const sql = `
    update tbl_blogs b set b.title='${title}', 
    b.content='${content}' where id='${id}'
  `;
  return exec(sql);
}

const deleteBlog = (id) => {
  const sql = `
    update tbl_blogs b set b.status=0 where id='${id}'
  `;
  return exec(sql);
}

module.exports = {
  getList,
  getDetail,
  addBlog,
  deleteBlog,
  updateBlog,
};