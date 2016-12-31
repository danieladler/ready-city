import { LOAD_HOMES, UPDATE_HOME } from '../constants/HomeConstants.jsx';
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
  const request = axios.patch(`${API_URL}/homes/update/${id}`, params);
  debugger
  // return {
  //   type: UPDATE_HOME,
  //   payload: request,
  //   index
  // }
};
