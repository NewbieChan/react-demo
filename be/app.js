const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const isLogin = require('./middleware/isLogin');
const log = require('./middleware/log');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');

const app = express();

app.use(log()); // 日志
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/user', userRouter);
app.use(isLogin()); // 博客的接口都需要用户登录才可以
app.use('/blog', blogRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // return error message
  return res.json({
    status: err.status || 500,
    message: err.message,
  });
});

module.exports = app;
