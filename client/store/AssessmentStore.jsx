import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/index';
// import thunk from 'redux-thunk';
// import promise from 'redux-promise';
// import createLogger from 'redux-logger';

const store = createStore(
  rootReducer,
  // applyMiddleware(thunk, promise, logger);
);


export default store;
