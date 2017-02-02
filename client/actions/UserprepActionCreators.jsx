import {
  LOAD_USERPREPS
} from '../constants/UserprepConstants.jsx';
import { API_URL } from '../constants/ApiConstants.jsx';

import axios from 'axios';

export function loadUserpreps(userId) {
  const request = axios.get(`${API_URL}/userpreps/api/${userId}`);
  return {
    type: LOAD_USERPREPS,
    payload: request
  }
};

export function setVisibilityFilter(filter) {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

// Later, this could become part of a general updateUserprep function
export function toggleUserprepComplete(id, params) {
  axios.patch(`${API_URL}/userpreps/update/${id}`, params);
  return {
    type: 'TOGGLE_USERPREP_COMPLETE',
    id
    // payload: response
  }
}
