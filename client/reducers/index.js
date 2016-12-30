import { combineReducers } from 'redux';
import homesReducer from "./home";
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  homes: homesReducer,
  form: formReducer
});

export default rootReducer;
