import * as types from '../actionTypes';

const defaultState = {
  username: '',
  token: '',
}

export default (state = defaultState, action) => {
  if (action.type === types.LOGIN) {
    const newState = Object.assign({}, state, {
      username: action.payload.username,
      token: action.payload.token,
    });
    return newState;
  }
  if (action.type === types.LOGOUT) {
    const newState = Object.assign({}, state, {
      token: '',
      username: '',
    });
    return newState;
  }

  if (action.type === types.IS_LOGIN) {
    const newState = Object.assign({}, state, {
      token: action.token,
      username: action.payload.username,
    });
    return newState;
  }
  return state;
}
