const express = require('express');
const router = express.Router();
const {
  getList,
  getDetail,
  addBlog,
  deleteBlog,
  updateBlog,
} = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model');


router.get('/list', (req, res) => {
    const author = req.body.author || '';
    const keyword = req.query.keyword || '';
    getList(author, keyword).then(data => {
      res.json(new SuccessModel(data));
    });
})

router.get('/detail', (req, res) => {
  const id = req.query.id || '';
  getDetail(id).then(data => {
    if (data[0].author) {
      res.json(new SuccessModel(data[0]));
    } else {
      res.json(new ErrorModel('获取博客详情失败'));
    }
  })
})

router.post('/add', (req, res) => {
  const title = req.body.title || '';
  const content = req.body.content || '';
  const author = req.body.author || '';
  addBlog(author, title, content).then(data => {
    if (data.insertId) {
      res.json(new SuccessModel('添加博客成功'));
    } else {
      res.json(new ErrorModel('添加博客失败'));
    }
  })
})

router.post('/update', (req, res) => {
  const id = req.body.id || '';
  const title = req.body.title || '';
  const content = req.body.content || '';
  updateBlog(id, title, content).then(data => {
    if (data.affectedRows > 0) {
      res.json(new SuccessModel('更新博客成功'));
    } else {
      res.json(new ErrorModel('更新博客失败'));
    }
  });
})

router.post('/delete', (req, res) => {
  const id = req.body.id || '';
  deleteBlog(id).then(data => {
    if (data.affectedRows > 0) {
      res.json(new SuccessModel('删除博客成功'));
    } else {
      res.json(new ErrorModel('删除博客失败'));
    }
  });
})

module.exports = router;
