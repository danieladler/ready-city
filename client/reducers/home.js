// import constants
import { LOAD_HOME } from '../constants/HomeConstants.jsx';
// functions for more complicated state updates
// ~ TBD ~

const home = (state = [], action) => {
  switch (action.type) {
    case "LOAD_HOME":
      console.log('load_home triggered');
      // return [
      //   ...state, home: action.payload.data
      // ];
    default:
      return state;
  }
};

export default home;
