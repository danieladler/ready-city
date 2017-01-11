import {
  LOAD_ZONES,
  CREATE_ZONE_SUCCESS,
  CREATE_ZONE_ERROR,
  UPDATE_ZONE_SUCCESS,
  UPDATE_ZONE_ERROR,
  DESTROY_ZONE
} from '../constants/ZoneConstants.jsx';
import axios from 'axios';
import {reset} from 'redux-form';

const API_URL = "http://localhost:5000";

export function loadZones() {
  const request = axios.get(`${API_URL}/zones`);
  return {
    type: LOAD_ZONES,
    payload: request
  }
};

export function createZone(params) {
  const createZoneSuccess = (response) => {
    return {
      type: CREATE_ZONE_SUCCESS,
      payload: response
    }
  }

  const createZoneError = (err) => {
    return {
      type: CREATE_ZONE_ERROR,
      payload: err
    }
  }

  return (dispatch) => {
    axios.post(`${API_URL}/zones/create`, params)
    .then((response) => {
      dispatch(reset('CreateZoneForm'));
      dispatch(createZoneSuccess(response));
    })
    .catch((err) => {
      dispatch(createZoneError(err));
    })
  }
}

export function updateZone(id, params, index) {
  const updateZoneSuccess = (response) => {
    return {
      type: UPDATE_ZONE_SUCCESS,
      payload: response,
      index
    }
  }

  const updateZoneError = (err) => {
    return {
      type: UPDATE_ZONE_ERROR,
      payload: err,
      index
    }
  }

  return (dispatch) => {
    axios.patch(`${API_URL}/zones/update/${id}`, params)
    .then((response) => {
      dispatch(updateZoneSuccess(response))
    })
    .catch((err) => {
      // TODO: refactor error handling to work as-is but not return a
      // 422 error in the console when the PATCH request fails because
      // of a validation error.
      dispatch(updateZoneError(err))
    })
  }
};

export function destroyZone(authenticity_token, id, index) {
  const destroyZoneSuccess = (index) => {
    return {
      type: DESTROY_ZONE,
      index
    }
  }

  return (dispatch) => {
    axios({
      method: 'delete',
      url: `${API_URL}/zones/destroy/${id}`,
      data: {authenticity_token}
    })
    .then(() => {
      dispatch(destroyZoneSuccess(index));
    });
  }
};
