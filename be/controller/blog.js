const { exec, escape } = require('../db/mysql');

// 获取博客列表
const getList = (author, keyword) => {
  author = escape(author);
  keyword = escape(keyword);
  let sql = `
    select id, title, content, create_at, author from tbl_blogs where status='1' 
  `;
  if (author) {
    sql += `and author=${author} `;
  }
  if (keyword) {
    sql += `or title like '%${keyword}%'`;
  }
  return exec(sql);
}

const getDetail = (id) => {
  id = escape(id);
  const sql = `select id, title, content, create_at, author from tbl_blogs where id = ${id}`;
  return exec(sql);
}

const addBlog = (author, title, content) => {
  const now = Date.now();
  title = escape(title);
  author = escape(author);
  content = escape(content);
  const sql = `
    insert into tbl_blogs (title, content, create_at, author) 
    values (${title}, ${content}, ${now}, ${author})
  `
  return exec(sql);
}

const updateBlog = (id, title, content) => {
  id = escape(id);
  title = escape(title);
  content = escape(content);
  const sql = `
    update tbl_blogs b set b.title=${title}, 
    b.content=${content} where id=${id}
  `;
  return exec(sql);
}

const deleteBlog = (id) => {
  id = escape(id);
  const sql = `
    update tbl_blogs b set b.status=0 where id=${id}
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
