// import constants
import {
  LOAD_CONTACTS,
  UPDATE_CONTACT_SUCCESS,
  // UPDATE_CONTACT_ERROR
} from '../constants/ContactConstants.jsx';

// functions for more complicated state updates, and to work around Webpack
// compile error when doing duplicate declarations of const index, model, etc.
const updateContactSuccess = (state, action) => {
  const contact = action.payload.data.contact;
  const index = action.index;
  const success = action.payload.data.success;
  const errors = null;
  return { all: [
      ...state.all.slice(0, index),
      { ...contact, success, errors },
      ...state.all.slice(index + 1)
    ]
  }
}

// const updateContactError = (state, action) => {
//   debugger
//   const contact = action.payload.data.contact;
//   const index = action.index;
//   const success = null;
//   const errors = action.payload.data.errors;
//   const all = state.all
//   return { all: [
//       ...state.all.slice(0, index),
//       {  ...all[index], errors, success },
//       ...state.all.slice(index + 1)
//     ]
//   }
// }

const INITIAL_STATE = { all: [], errors: [] };

const contacts = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_CONTACTS:
      return { ...state, all: action.payload.data } ;
    case UPDATE_CONTACT_SUCCESS:
      return updateContactSuccess(state, action);
    // case UPDATE_CONTACT_ERROR:
    //   return updateContactError(state, action);
    default:
      return state;
  }
};

export default contacts;
