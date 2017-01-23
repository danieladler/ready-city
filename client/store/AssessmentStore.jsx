import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';

const middlewares = [thunk, promise];

if(process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middlewares.push(logger)
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

export default store;
