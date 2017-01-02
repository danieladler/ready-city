import { LOAD_HOMES, UPDATE_HOME_SUCCESS, UPDATE_HOME_ERROR } from '../constants/HomeConstants.jsx';
import axios from 'axios';

const API_URL = "http://localhost:5000";

export function loadHomes() {
  const request = axios.get(`${API_URL}/home`);
  return {
    type: LOAD_HOMES,
    payload: request
  }
};

export function updateHome(id, params, index) {
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

  return function(dispatch) {
    axios.patch(`${API_URL}/homes/update/${id}`, params)
    .then((response) => {
      dispatch(updateHomeSuccess(response))
    })
    .catch((err) => {
      dispatch(updateHomeError(err))
    })
  }
};
