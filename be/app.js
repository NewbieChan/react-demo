const {
  handleUserRoute,
  handleBlogRoute,
} = require('./src/router');
const querystring = require('querystring');
const { get } = require('./src/db/redis');
const { access } = require('./src/utils/log');

const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({});
      return;
    }
    if (req.headers['content-type'] !== 'application/json;charset=UTF-8') {
      resolve({});
      return;
    }
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    });
    req.on('end', () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    });
  })
}

const serverHandle = (req, res) => {
  const token = req.headers.token;
  // 设置返回格式 JSON
  res.setHeader('Content-Type', 'application/json;charset=UTF-8');
  const url = req.url;
  req.path = url.split('?')[0];
  req.query = querystring.parse(url.split('?')[1]);
  access(req.method + '---' + req.path + '---' + req.headers['user-agent'] + '---' + Date.now())

  getPostData(req).then(result => {
    req.body = result;

    get(token).then(redisData => {
        req.body.author = redisData;

        const userRoute = handleUserRoute(req, res);
        if (userRoute) {
          userRoute.then(data => {
            res.end(JSON.stringify(data));
          })
          return;
        }

        const blogRoute = handleBlogRoute(req, res);
        if (blogRoute) {
          if (req.body.author) {
            blogRoute.then(data => {
              if (data) {
                res.end(JSON.stringify(data));
              }
            });
          } else {
            res.write(JSON.stringify({
              code: '000401',
              message: '请现登录',
            }));
            res.end();
          }
          return;
        }
    
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 not found\n');
        res.end();
      
    })
    
  })
}

module.exports = serverHandle;
