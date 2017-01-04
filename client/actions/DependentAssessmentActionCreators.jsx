import { LOAD_DEPENDENTS, UPDATE_DEPENDENT_SUCCESS, UPDATE_DEPENDENT_ERROR } from '../constants/DependentConstants.jsx';
import axios from 'axios';

const API_URL = "http://localhost:5000";

export function loadDependents() {
  const request = axios.get(`${API_URL}/dependents`);
  return {
    type: LOAD_DEPENDENTS,
    payload: request
  }
};

export function updateDependent(id, params, index) {
  const updateDependentSuccess = (response) => {
    return {
      type: UPDATE_DEPENDENT_SUCCESS,
      payload: response,
      index
    }
  }

  const updateDependentError = (err) => {
    return {
      type: UPDATE_DEPENDENT_ERROR,
      payload: err,
      index
    }
  }

  return function(dispatch) {
    axios.patch(`${API_URL}/dependents/update/${id}`, params)
    .then((response) => {
      dispatch(updateDependentSuccess(response))
    })
    .catch((err) => {
      // TODO: refactor error handling to work as-is but not return a
      // 422 error in the console when the PATCH request fails because
      // of a validation error.
      dispatch(updateDependentError(err))
    })
  }
};
