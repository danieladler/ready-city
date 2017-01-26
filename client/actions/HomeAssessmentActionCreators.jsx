import {
  LOAD_HOMES,
  UPDATE_HOME_SUCCESS,
  UPDATE_HOME_ERROR
} from '../constants/HomeConstants.jsx';
import { LOAD_USERPREPS } from '../constants/UserprepConstants.jsx';
import { API_URL } from '../constants/ApiConstants.jsx';
import { loadUserpreps } from './UserprepActionCreators.jsx';

import axios from 'axios';

export function loadHomes() {
  const request = axios.get(`${API_URL}/home`);
  return {
    type: LOAD_HOMES,
    payload: request
  }
};

export function updateHome(id, params, index, userId) {
  const updateHomeSuccess = (response) => {
    return {
      type: UPDATE_HOME_SUCCESS,
      payload: response,
      index
    }
  }

  const updateHomeError = (err) => {
    return {
      type: UPDATE_HOME_ERROR,
      payload: err,
      index
    }
  }

  return (dispatch) => {
    axios.patch(`${API_URL}/homes/update/${id}`, params)
    .then((response) => {
      dispatch(updateHomeSuccess(response))
      loadUserpreps(userId);
    })
    .catch((err) => {
      // TODO: refactor error handling to work as-is but not return a
      // 422 error in the console when the PATCH request fails because
      // of a validation error.
      dispatch(updateHomeError(err))
    })
  }
};
