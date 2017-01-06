import {
  LOAD_CONTACTS,
} from '../constants/ContactConstants.jsx';
import axios from 'axios';
import {reset} from 'redux-form';

const API_URL = "http://localhost:5000";

export function loadContacts() {
  const request = axios.get(`${API_URL}/contacts`);
  return {
    type: LOAD_CONTACTS,
    payload: request
  }
};
