const path = require('path');
const logger = require('morgan');
const rfs = require('rotating-file-stream');

const pad = num => {
  return (num > 9 ? "" : "0") + num;
}

const generator = (time) => {
  if (!time) return "access.log";
  const year = time.getFullYear();
  const month = pad(time.getMonth() + 1);
  var day = pad(time.getDate());
  return year + "-" + month + '-' + day + "-access.log";
}

const accessLogStream = rfs(generator(new Date), {
  interval: '1d', // rotate daily
  path: path.join(__dirname, '../', 'logs')
})

module.exports = () => {
  return logger('combined', { stream: accessLogStream })
}