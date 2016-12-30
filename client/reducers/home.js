// import constants
import { LOAD_HOMES } from '../constants/HomeConstants.jsx';

// functions for more complicated state updates
// ~ TBD ~

// const INITIAL_STATE = { home: {} };
const INITIAL_STATE = { all: [] };

const homes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_HOMES:
      return { ...state, all: action.payload.data } ;
    default:
      return state;
  }
};

export default homes;
