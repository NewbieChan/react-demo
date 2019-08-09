import * as types from '../actionTypes';
import history from '../../utils/history';
import BlogFetch from '../../service/blog';
import { message } from 'antd';
import { dateFormat } from '../../utils/date_format';

export const getAddTodoItem = (payload) => ({
  type: types.ADD_TODO_ITEM,
  payload,
})

export const getDeleteTodoItem = (index) => ({
  type: types.DEL_TODO_ITEM,
  index,
})

export const initListAction = (list) => ({
  type: types.INIT_TODO_LIST,
  list,
})

export const getInfo = (blogInfo) => ({
  type: types.GET_BLOG_INFO,
  blogInfo
})

export const getTodoList = () => {
  return async dispatch => {
    const res = await BlogFetch.getBlogList();
    if (res.success) {
      const data = res.data.map((item) => {
        item.create_at = dateFormat(item.create_at, 'yyyy-MM-dd hh:mm:ss');
        return item;
      });
      const action = initListAction(data);
      dispatch(action);
    }
  }
}

export const addBlog = (title, content) => {
  return async dispatch => {
    const res = await BlogFetch.addBlog({ title, content });
    if (res.success) {
      message.success('添加博客成功');
      history.go(-1);
    }
  }
}

export const updateBlog = (id, title, content) => {
  return async dispatch => {
    const res = await BlogFetch.updateBlog({ id, title, content });
    if (res.success) {
      message.success('更新博客成功');
      history.go(-1);
      history.go(-1);
      dispatch(getInfo({}));
    }
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    const res = await BlogFetch.deleteBlog({ id });
    if (res.success) {
      message.success('删除博客成功');
      const action = getTodoList();
      dispatch(action);
    }
  }
}

export const getBlogDetail = (id) => {
  return async dispatch => {
    if (id) {
      const res = await BlogFetch.getBlogDetail(id);
      if (res.success) {
        res.data.create_at = dateFormat(res.data.create_at, 'yyyy-MM-dd hh:mm:ss');
        const action = getInfo(res.data);
        dispatch(action);
      }
    } else {
      await dispatch(getInfo({}));
    }
  }
  
}
