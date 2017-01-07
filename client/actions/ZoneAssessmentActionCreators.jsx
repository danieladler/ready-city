import {
  LOAD_ZONES,
  UPDATE_ZONE_SUCCESS,
  UPDATE_ZONE_ERROR
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

  return function(dispatch) {
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
