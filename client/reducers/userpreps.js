import {
  LOAD_USERPREPS
} from '../constants/UserprepConstants.jsx';

const INITIAL_STATE = { all: [] };

const userpreps = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case LOAD_USERPREPS:
      return { ...state, all: action.payload.data };
    default:
      return state;
  }
}

export default userpreps;
