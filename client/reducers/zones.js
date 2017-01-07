import {
  LOAD_ZONES,
  UPDATE_ZONE_SUCCESS,
  UPDATE_ZONE_ERROR
} from '../constants/ZoneConstants.jsx';

// functions for more complicated state updates, and to work around Webpack
// compile error when doing duplicate declarations of const index, model, etc.
const updateZoneSuccess = (state, action) => {
  const zone = action.payload.data.zone;
  const index = action.index;
  const success = action.payload.data.success;
  const errors = null;
  return { all: [
      ...state.all.slice(0, index),
      { ...zone, success, errors },
      ...state.all.slice(index + 1)
    ]
  }
}

const updateZoneError = (state, action) => {
  const zone = action.payload.data.zone;
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

const INITIAL_STATE = { all: [], errors: [] };

const zones = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_ZONES:
      return { ...state, all: action.payload.data };
    case UPDATE_ZONE_SUCCESS:
      return updateZoneSuccess(state, action);
    case UPDATE_ZONE_ERROR:
      return updateZoneError(state, action);
    default:
      return state;
  }
};

export default zones;
