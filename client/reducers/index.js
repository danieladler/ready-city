import { combineReducers } from 'redux';
import homesReducer from "./homes";
import dependentsReducer from "./dependents";
import contactsReducer from "./contacts";
import zonesReducer from "./zones";
import preparationsReducer from "./preparations";
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  homes: homesReducer,
  dependents: dependentsReducer,
  contacts: contactsReducer,
  zones: zonesReducer,
  preparations: preparationsReducer,  
  form: formReducer
});

export default rootReducer;
