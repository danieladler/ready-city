import { LOAD_DEPENDENTS } from '../constants/DependentConstants.jsx';
import axios from 'axios';

const API_URL = "http://localhost:5000";

export function loadDependents() {
  const request = axios.get(`${API_URL}/dependents`);
  return {
    type: LOAD_DEPENDENTS,
    payload: request
  }
};
