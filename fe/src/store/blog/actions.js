import * as types from '../actionTypes';
import history from '../../utils/history';
import BlogFetch from '../../service/blog';

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
      const action = initListAction(res.data);
      dispatch(action);
    }
  }
}

export const addBlog = (title, content) => {
  return async dispatch => {
    const res = await BlogFetch.addBlog({ title, content });
    if (res.success) {
      history.go(-1);
    }
  }
}

export const updateBlog = (id, title, content) => {
  return async dispatch => {
    const res = await BlogFetch.updateBlog({ id, title, content });
    if (res.success) {
      history.go(-1);
      dispatch(getInfo({}));
    }
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    const res = await BlogFetch.deleteBlog({ id });
    if (res.success) {
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
        const action = getInfo(res.data);
        dispatch(action);
      }
    } else {
      await dispatch(getInfo({}));
    }
  }
  
}
