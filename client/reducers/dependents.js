// import constants
import {
  LOAD_DEPENDENTS,
  CREATE_DEPENDENT_SUCCESS,
  CREATE_DEPENDENT_ERROR,
  UPDATE_DEPENDENT_SUCCESS,
  UPDATE_DEPENDENT_ERROR,
  DESTROY_DEPENDENT
} from '../constants/DependentConstants.jsx';

// functions for more complicated state updates, and to work around Webpack
// compile error when doing duplicate declarations of const index, model, etc.
const createDependentSuccess = (state, action) => {
  const all = state.all
  const newDependent = action.payload.data.dependent;
  return { all: [
      ...state.all, {
        id: newDependent.id,
        name: newDependent.name,
        human: newDependent.human
      }
    ]
  }
}

const createDependentError = (state, action) => {
  const errors = action.payload.data.errors;
  return { ...state, errors: errors }
}

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
  return { all: [
      ...state.all.slice(0, action.index),
      ...state.all.slice(action.index + 1)
    ]
  }
}

const INITIAL_STATE = { all: [], errors: [] };

const dependents = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_DEPENDENTS:
      return { ...state, all: action.payload.data } ;
    case CREATE_DEPENDENT_SUCCESS:
      return createDependentSuccess(state, action);
    case CREATE_DEPENDENT_ERROR:
      return createDependentError(state, action);
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
