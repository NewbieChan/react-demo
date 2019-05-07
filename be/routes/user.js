const express = require('express');
const router = express.Router();
const uuidv1 = require('uuid/v1');
const {
  login,
  register
} = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model');
const { set, del } = require('../db/redis');

router.post('/login', (req, res) => {
  const username = req.body.username || '';
  const password = req.body.password || '';
  login(username, password).then(data => {
    const user = data[0] || {};
    if (user.username) {
      const key = uuidv1();
      set(key, user.username).then(res => {
        console.log('将session成功写入redis- ', res);
      })
      res.json(new SuccessModel({ token: key }, '登录成功'));
    } else {
      res.json(new ErrorModel('登录失败'));
    }
  });
})

router.post('/register', (req, res) => {
  const username = req.body.username || '';
  const password = req.body.password || '';
  const realname = req.body.realname || '';
  register(username, password, realname).then(data => {
    if (data.insertId) {
      res.json(new SuccessModel('注册成功'));
    } else {
      res.json(new ErrorModel('注册失败'));
    }
  })
})

router.post('/logout', (req, res) => {
  const token = req.headers['token'];
  del(token).then(data => {
    res.json(new SuccessModel('退出成功'));
  }).catch(err => {
    res.json(new ErrorModel('退出失败'));
  })
})

module.exports = router;
