import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import initialState from './initialState';

const middlewares = [thunk];
const enhancers = [];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  (state, action) => state,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares), ...enhancers)
);

export default store;
