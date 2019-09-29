import { compose, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';
import initialState from './initialState';

const middlewares = [thunk];
const enhancers = [];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(...middlewares), ...enhancers)
);

export default store;
