import {
  LOAD_HOMES,
  UPDATE_HOME_SUCCESS,
  UPDATE_HOME_ERROR
} from '../constants/HomeConstants.jsx';
import { LOAD_USERPREPS } from '../constants/UserprepConstants.jsx';
import { API_URL } from '../constants/ApiConstants.jsx';
// import loadUserpreps from './UserprepActionCreators.jsx';
// import {batchActions} from 'redux-batched-actions';

import axios from 'axios';

export function loadHomes() {
  const request = axios.get(`${API_URL}/home`);
  return {
    type: LOAD_HOMES,
    payload: request
  }
};

export function updateHome(id, params, index, userId) {
  // debugger
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

  const user_id = userId;

  const loadUserpreps = (userId) => {
    // debugger
    const request = axios.get(`${API_URL}/userpreps/api/${userId}`);
    return {
      type: LOAD_USERPREPS,
      payload: request
    }
  }

  return (dispatch) => {
    // debugger
    axios.patch(`${API_URL}/homes/update/${id}`, params)
    .then((response, userId) => {
      dispatch(updateHomeSuccess(response)) //.then(id) =>
      // debugger
      // dispatch(loadUserpreps(userId))
    })
    .catch((err) => {
      // TODO: refactor error handling to work as-is but not return a
      // 422 error in the console when the PATCH request fails because
      // of a validation error.
      dispatch(updateHomeError(err))
    })
  }
};
