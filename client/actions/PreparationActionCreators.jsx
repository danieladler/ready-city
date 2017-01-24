import {
  LOAD_USERPREPS
} from '../constants/PreparationConstants.jsx';
import { API_URL } from '../constants/ApiConstants.jsx';

import axios from 'axios';

export function loadUserPreps(userId) {
  // const request = axios.get(`${API_URL}/preparations/${userId}/?format=json`);
  const request = axios.get(`${API_URL}/preparations/api/${userId}`);
  return {
    type: LOAD_USERPREPS,
    payload: request
  }
};
