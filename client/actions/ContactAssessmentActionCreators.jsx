import {
  LOAD_CONTACTS,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_ERROR
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

export function updateContact(id, params, index) {
  const updateContactSuccess = (response) => {
    return {
      type: UPDATE_CONTACT_SUCCESS,
      payload: response,
      index
    }
  }

  const updateContactError = (err) => {
    return {
      type: UPDATE_CONTACT_ERROR,
      payload: err,
      index
    }
  }

  return function(dispatch) {
    axios.patch(`${API_URL}/contacts/update/${id}`, params)
    .then((response) => {
      dispatch(updateContactSuccess(response))
    })
    .catch((err) => {
      // TODO: refactor error handling to work as-is but not return a
      // 422 error in the console when the PATCH request fails because
      // of a validation error.
      dispatch(updateContactError(err))
    })
  }
};
