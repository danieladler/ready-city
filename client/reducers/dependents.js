// import constants
import { LOAD_DEPENDENTS } from '../constants/DependentConstants.jsx';

// functions for more complicated state updates, and to work around Webpack
// compile error when doing duplicate declarations of const index, model, etc.


const INITIAL_STATE = { all: [], errors: [] };

const dependents = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_DEPENDENTS:
      return { ...state, all: action.payload.data } ;
    default:
      return state;
  }
};

export default dependents;
