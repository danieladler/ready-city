import {
  LOAD_ZONES,
} from '../constants/ZoneConstants.jsx';
import axios from 'axios';
import {reset} from 'redux-form';

const API_URL = "http://localhost:5000";

export function loadZones() {
  const request = axios.get(`${API_URL}/zones`);
  return {
    type: LOAD_ZONES,
    payload: request
  }
};
