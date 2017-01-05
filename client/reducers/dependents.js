// import constants
import {
  LOAD_DEPENDENTS,
  UPDATE_DEPENDENT_SUCCESS,
  UPDATE_DEPENDENT_ERROR,
  DESTROY_DEPENDENT
} from '../constants/DependentConstants.jsx';

// functions for more complicated state updates, and to work around Webpack
// compile error when doing duplicate declarations of const index, model, etc.
const updateDependentSuccess = (state, action) => {
  const dependent = action.payload.data.dependent;
  const index = action.index;
  const success = action.payload.data.success;
  const errors = null;
  return { all: [
      ...state.all.slice(0, index),
      { ...dependent, success, errors },
      ...state.all.slice(index + 1)
    ]
  }
}

const updateDependentError = (state, action) => {
  const dependent = action.payload.data.dependent;
  const index = action.index;
  const success = null;
  const errors = action.payload.data.errors;
  const all = state.all
  return { all: [
      ...state.all.slice(0, index),
      {  ...all[index], errors, success },
      ...state.all.slice(index + 1)
    ]
  }
}

const destroyDependentSuccess = (state, action) => {
  const index = action.index;
  return { all: [
      ...state.all.slice(0, index),
      ...state.all.slice(index + 1)
    ]
  }
}

const INITIAL_STATE = { all: [], errors: [] };

const dependents = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_DEPENDENTS:
      return { ...state, all: action.payload.data } ;
    case UPDATE_DEPENDENT_SUCCESS:
      return updateDependentSuccess(state, action);
    case UPDATE_DEPENDENT_ERROR:
      return updateDependentError(state, action);
    case DESTROY_DEPENDENT:
      return destroyDependentSuccess(state, action);
    default:
      return state;
  }
};

export default dependents;
