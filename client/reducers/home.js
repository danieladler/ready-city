// import constants
import { LOAD_HOME } from '../constants/HomeConstants.jsx';

// functions for more complicated state updates
// ~ TBD ~

const INITIAL_STATE = { home: {} };

const homes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_HOME:
      return { ...state, home: action.payload.data } ;
    default:
      return state;
  }
};

export default homes;
