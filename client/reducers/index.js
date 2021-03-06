import { combineReducers } from 'redux';
import homesReducer from "./homes";
import dependentsReducer from "./dependents";
import contactsReducer from "./contacts";
import zonesReducer from "./zones";
import UserprepsReducer from "./userpreps";
import visibilityFilter from "./visibilityFilter";
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  homes: homesReducer,
  dependents: dependentsReducer,
  contacts: contactsReducer,
  zones: zonesReducer,
  userpreps: UserprepsReducer,
  visibilityFilter: visibilityFilter,
  form: formReducer
});

export default rootReducer;
