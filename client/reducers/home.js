// import constants
import { LOAD_HOMES, UPDATE_HOME_SUCCESS, UPDATE_HOME_ERROR } from '../constants/HomeConstants.jsx';

// functions for more complicated state updates, and to work around Webpack
// compile error when doing duplicate declarations of const index, home, etc.
const updateHomeSuccess = (state, action) => {
  const home = action.payload.data;
  const index = action.index;
  return { all: [
      ...state.all.slice(0, index),
      { ...home },
      ...state.all.slice(index + 1)
    ]
  }
}

const updateHomeError = (state, action) => {
  const index = action.index;
  const errors = action.payload.data.errors;
  const home = action.payload.data.home;
  const all = state.all
  return { all: [
      ...state.all.slice(0, index),
      {  ...all[index], errors },
      ...state.all.slice(index + 1)
    ]
  }
}

const INITIAL_STATE = { all: [], errors: [] };

const homes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_HOMES:
      return { ...state, all: action.payload.data } ;
    case UPDATE_HOME_SUCCESS:
      return updateHomeSuccess(state, action);
    case UPDATE_HOME_ERROR:
      return updateHomeError(state, action);
    default:
      return state;
  }
};

export default homes;
