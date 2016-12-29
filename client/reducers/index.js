import { combineReducers } from 'redux';
import homes from "./home";
// import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  homes
  // form: formReducer
});

export default rootReducer;
