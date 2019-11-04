import * as types from '../actionTypes';

const defaultState = {
  title: '',
  content: '',
  todoList: [],
  isVisable: false,
  blogInfo: null,
  total: 0,
};

export default (state = defaultState, action) => {
  if (action.type === types.ADD_TODO_ITEM) {
    const blog = {
      title: state.title,
      content: state.content,
    }
    const newState = Object.assign({}, state, {
        todoList: [...state.todoList, blog],
        title: '',
        content: '',
    });
    return newState;
  }
  if (action.type === types.DEL_TODO_ITEM) {
    const newState = Object.assign({}, state);
    newState.todoList.splice(action.index, 1);
    return newState;
  }
  if (action.type === types.INIT_TODO_LIST) {
    const newState = Object.assign({}, state, {
      todoList: action.list,
      total: action.total,
    })
    return newState;
  }
  if (action.type === types.IS_ADD) {
    const newState = Object.assign({}, state, {
      isVisable: action.status,
    });
    console.log(newState);
    return newState;
  }
  if (action.type === types.GET_BLOG_INFO) {
    const newState = Object.assign({}, state, {
      blogInfo: action.blogInfo,
    });
    return newState;
  }
  return state;
}
