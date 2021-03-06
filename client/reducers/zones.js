import {
  LOAD_ZONES,
  CREATE_ZONE_SUCCESS,
  CREATE_ZONE_ERROR,
  UPDATE_ZONE_SUCCESS,
  UPDATE_ZONE_ERROR,
  DESTROY_ZONE
} from '../constants/ZoneConstants.jsx';

// functions for more complicated state updates, and to work around Webpack
// compile error when doing duplicate declarations of const index, model, etc.
const createZoneSuccess = (state, action) => {
  const all = state.all
  const newZone = action.payload.data.zone;
  return { all: [
      ...state.all, {
        id: newZone.id,
        name: newZone.name,
        address: newZone.address,
        city: newZone.city,
        state: newZone.state,
        zip: newZone.zip,
        zone_type: newZone.zone_type,
        dependent_id: newZone.dependent_id
      }
    ]
  }
}

const createZoneError = (state, action) => {
  const errors = action.payload.data.errors;
  return { ...state, errors: errors }
}

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

const destroyZoneSuccess = (state, action) => {
  return { all: [
      ...state.all.slice(0, action.index),
      ...state.all.slice(action.index + 1)
    ]
  }
}

const INITIAL_STATE = { all: [], errors: [] };

const zones = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_ZONES:
      return { ...state, all: action.payload.data };
    case CREATE_ZONE_SUCCESS:
      return createZoneSuccess(state, action);
    case CREATE_ZONE_ERROR:
      return createZoneError(state, action);
    case UPDATE_ZONE_SUCCESS:
      return updateZoneSuccess(state, action);
    case UPDATE_ZONE_ERROR:
      return updateZoneError(state, action);
    case DESTROY_ZONE:
      return destroyZoneSuccess(state, action);
    default:
      return state;
  }
};

export default zones;
