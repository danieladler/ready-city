import { combineReducers } from 'redux';
import homesReducer from "./homes";
import dependentsReducer from "./dependents";
import contactsReducer from "./contacts";
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  homes: homesReducer,
  dependents: dependentsReducer,
  contacts: contactsReducer,
  form: formReducer
});

export default rootReducer;
