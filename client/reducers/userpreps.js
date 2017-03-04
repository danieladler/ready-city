import {
  LOAD_USERPREPS,
  TOGGLE_USERPREP_COMPLETED,
  UPDATE_USERPREP_SUCCESS,
  UPDATE_USERPREP_ERROR
} from '../constants/UserprepConstants.jsx';

const INITIAL_STATE = { all: [] };

const toggleUserprepCompleted = (state, action) => {
  const userprep = action.payload.data.userprep;
  const all = state.all;
  return {
    all: all.map((prep) => {
      if (prep.id === userprep.id) {
        return userprep
      } else {
        return prep
      }
    })
  }
}

const userpreps = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case LOAD_USERPREPS:
      return { ...state, all: action.payload.data };
    case TOGGLE_USERPREP_COMPLETED:
      return toggleUserprepCompleted(state, action)
    default:
      return state;
  }
}

export default userpreps;
