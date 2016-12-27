import { LOAD_HOME } from '../constants/HomeConstants.jsx';
import axios from 'axios';

const API_URL = "http://localhost:5000";

export function loadHome() {
  const request = axios.get(`${API_URL}/home`);
  return {
    type: LOAD_HOME,
    payload: request
  }
};
