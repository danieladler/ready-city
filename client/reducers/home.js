// import constants
import { LOAD_HOMES, UPDATE_HOME } from '../constants/HomeConstants.jsx';

// functions for more complicated state updates

const INITIAL_STATE = { all: [] };

const homes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_HOMES:
      return { ...state, all: action.payload.data } ;
    case UPDATE_HOME:
      // debugger
      // const home = action.payload.data;
      // const index = action.index;
      // return { all: [
      //     ...state.all.slice(0,index), // before the one we are updating
      //     {...state.all[index], home},
      //     ...state.all.slice(index + 1), // after the one we are updating
      //   ]
      // };
    default:
      return state;
  }
};

export default homes;
