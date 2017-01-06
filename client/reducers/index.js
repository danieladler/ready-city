import { combineReducers } from 'redux';
import homesReducer from "./homes";
import dependentsReducer from "./dependents";
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  homes: homesReducer,
  dependents: dependentsReducer,
  form: formReducer
});

export default rootReducer;
