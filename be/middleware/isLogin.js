const { get } = require('../db/redis');
const { ErrorModel } = require('../model');

module.exports = () => {
  return (req, res, next) => {
    const token = req.headers['token'];
    req.body.author = '';
    get(token).then(data => {
      req.body.author = data;
      next();
    }).catch(err => {
      req.body.author = '';
      res.json(new ErrorModel({ code: '000401' }, '请先登录'))
    })
  }
}
