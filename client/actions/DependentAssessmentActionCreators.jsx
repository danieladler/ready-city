import {
  LOAD_DEPENDENTS,
  CREATE_DEPENDENT_SUCCESS,
  CREATE_DEPENDENT_ERROR,
  UPDATE_DEPENDENT_SUCCESS,
  UPDATE_DEPENDENT_ERROR,
  DESTROY_DEPENDENT,
} from '../constants/DependentConstants.jsx';
import axios from 'axios';
import {reset} from 'redux-form';

const API_URL = "http://localhost:5000";

export function loadDependents() {
  const request = axios.get(`${API_URL}/dependents`);
  return {
    type: LOAD_DEPENDENTS,
    payload: request
  }
};

export function createDependent(params) {
  const createDependentSuccess = (response) => {
    return {
      type: CREATE_DEPENDENT_SUCCESS,
      payload: response
    }
  }

  const createDependentError = (err) => {
    return {
      type: CREATE_DEPENDENT_ERROR,
      payload: err
    }
  }

  return function(dispatch) {
    axios.post(`${API_URL}/dependents/create`, params)
    .then((response) => {
      dispatch(createDependentSuccess(response));
    })
    .catch((err) => {
      dispatch(createDependentError(err));
    })
  }
}

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

export function destroyDependent(id, index) {
  const destroyDependentSuccess = (index) => {
    return {
      type: DESTROY_DEPENDENT,
      index
    }
  }

  return function(dispatch) {
    axios.delete(`${API_URL}/dependents/destroy/${id}`)
    .then(() => {
      dispatch(destroyDependentSuccess(index));
    });
  }
};
