import {
  LOAD_USERPREPS,
  TOGGLE_USERPREP_COMPLETED
} from '../constants/UserprepConstants.jsx';

const INITIAL_STATE = { all: [] };

// const toggleUserprepCompleted = (state, action) => {
//   const userprep = action.payload.data.userprep;
//   const index = action.index;
//   const all = state.all;
//   return { all: [
//       ...all.slice(0, action.index),
//       { ...userprep },
//       ...all.slice(index + 1)
//     ]
//   }
// }

const userpreps = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case LOAD_USERPREPS:
      return { ...state, all: action.payload.data };
    // case TOGGLE_USERPREP_COMPLETED:
    //   return toggleUserprepCompleted(state, action)
    default:
      return state;
  }
}

export default userpreps;
