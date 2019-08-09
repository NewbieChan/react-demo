const fs = require('fs');
const path = require('path');

// 写日志
const writeLog = (writeStream, log) => {
  writeStream.write(log + '\n'); // 关键代码
}

// 生成write stream
const createWriteStream = fileName => {
  const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName);
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a'
  });
  return writeStream;
}

const date = new Date();

// 写访问日志
const accessWriteStream = createWriteStream(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.access.log`);

const access = log => {
  writeLog(accessWriteStream, log);
}

module.exports = {
  access,
}