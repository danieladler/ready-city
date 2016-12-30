import { LOAD_HOMES } from '../constants/HomeConstants.jsx';
import axios from 'axios';

const API_URL = "http://localhost:5000";

export function loadHomes() {
  const request = axios.get(`${API_URL}/home`);
  return {
    type: LOAD_HOMES,
    payload: request
  }
};
