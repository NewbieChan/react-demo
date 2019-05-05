import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from 'redux';
import blogReducer from './blog/reducer';
import userReducer from './user/reducer';
import thunk from 'redux-thunk';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);

const reducers = combineReducers({
  blog: blogReducer,
  user: userReducer,
})

const store = createStore(
  reducers,
  enhancer
);

export default store;
