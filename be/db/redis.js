const redis = require('redis');
const { REDIS_CONFIG } = require('../config');

const client = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);

client.on('error', (err) => {
  console.log('The redis is fail - ', err);
});

const set = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  return new Promise((resolve, reject) => {
    client.set(key, value, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  })
}

const get = key => {
  return new Promise((resolve, reject) => {
    client.get(key, (err, data) => {
      if (err) {
        return reject(err);
      }
      try {
        return resolve(JSON.parse(data))
      } catch (error) {
        return resolve(data);
      }
    })
  });
}

const del = key => {
  return new Promise((resolve, reject) => {
    client.del(key, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    })
  })
}

module.exports = {
  set,
  get,
  del,
};
