import axios from 'axios';
import { message } from 'antd';
import { clearToken } from '../store/user/actions';
import store from '../store';

// 创建axios实例
const http = axios.create({
  baseURL: '',
  timeout: 5000,
});

http.interceptors.request.use(config => {
  // 登录返回的token，存到localStorage或者store里面都可以
  // 但是存到store里面的话，刷新页面store要重置，除非提供一个接口是否登录？
  const token = localStorage.getItem('token') || '';
  if (token) {
    config.headers['Token'] = token;
  } else {
    store.dispatch(clearToken());
  }
  return config;
}, error => {
  message.error('发起请求出错');
  return Promise.reject(error);
});

http.interceptors.response.use(
  res => {
    const data = res.data;
    // 请求成功的判断
    if (/^2/.test(res.status) && data.code === '000000') {
      return Object.assign({}, data, { success: true });
    } else {
      // 请求失败的判断
      switch(data.code) {
        case '000401': {
          message.error('还没有登录，请先登录', 3);
          store.dispatch(clearToken());
          break;
        }
        case '000408': {
          message.error('token已经过期，请重新登录', 3);
          store.dispatch(clearToken());
          break;
        }
        case '000409': {
          message.error('非法token，请重新登录', 3);
          store.dispatch(clearToken());
          break;
        }
        default: {
          message.error(res.message, 3);
          break;
        }
      }
      return Object.assign({}, data, { success: false });
    }
  },
  error => {
    console.error(error);
    if (error.status === '404') {
      message.error('请求地址不存在，亲，请检查一下');
    } else if (error.status === '500') {
      message.error('服务器报错');
    } else {
      message.error(error.message);
    }
    return Promise.reject(error);
  }
)

export default http;
