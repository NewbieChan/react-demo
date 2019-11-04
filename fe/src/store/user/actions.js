import * as types from '../actionTypes';
import history from '../../utils/history';
import UserFetch from '../../service/user';
import { message } from 'antd';

export const login = (payload) => ({
  type: types.LOGIN,
  payload,
})

export const logout = () => ({
  type: types.LOGOUT,
})

export const registerFn = (username, password, realname) => {
  return async dispatch => {
    const res = await UserFetch.register({ username, password, realname });
    if (res.success) {
      message.success('注册成功');
      dispatch(loginFn(username, password))
      // history.push('/login');
    }
  }
}

export const loginFn = (username, password) => {
  return async dispatch => {
    const res = await UserFetch.login({ username, password })
    if (res.success) {
      dispatch(login({
        username: username,
        token: res.data.token,
      }));
      localStorage.setItem('username', username);
      localStorage.setItem('token', res.data.token);
      history.push('/blog');
    }
  }
}

export const logoutFn = () => {
  return async dispatch => {
    const res = await UserFetch.logout();
    if (res.success) {
      message.success('退出成功');
      dispatch(logout())
      localStorage.clear();
      history.push('/login');
    }
  }
}

export const clearToken = () => {
  return dispatch => {
    dispatch(logout())
    localStorage.clear();
    history.push('/login');
  }
}

