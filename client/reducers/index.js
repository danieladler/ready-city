import { combineReducers } from 'redux';
import home from "./home";
// import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  home
  // form: formReducer
});

export default rootReducer;
