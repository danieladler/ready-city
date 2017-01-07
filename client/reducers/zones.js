import {
  LOAD_ZONES,
} from '../constants/ZoneConstants.jsx';

// functions for more complicated state updates, and to work around Webpack
// compile error when doing duplicate declarations of const index, model, etc.

const INITIAL_STATE = { all: [], errors: [] };

const zones = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_ZONES:
      return { ...state, all: action.payload.data } ;
    default:
      return state;
  }
};

export default zones;
