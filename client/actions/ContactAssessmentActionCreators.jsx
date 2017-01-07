import {
  LOAD_CONTACTS,
  CREATE_CONTACT_SUCCESS,
  CREATE_CONTACT_ERROR,
  UPDATE_CONTACT_SUCCESS,
  UPDATE_CONTACT_ERROR,
  DESTROY_CONTACT
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

export function createContact(params) {
  const createContactSuccess = (response) => {
    return {
      type: CREATE_CONTACT_SUCCESS,
      payload: response
    }
  }

  const createContactError = (err) => {
    return {
      type: CREATE_CONTACT_ERROR,
      payload: err
    }
  }

  return function(dispatch) {
    axios.post(`${API_URL}/contacts/create`, params)
    .then((response) => {
      dispatch(reset('CreateContactForm'));
      dispatch(createContactSuccess(response));
    })
    .catch((err) => {
      dispatch(createContactError(err));
    })
  }
}

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

export function destroyContact(id, index) {
  const destroyContactSuccess = (index) => {
    return {
      type: DESTROY_CONTACT,
      index
    }
  }

  return function(dispatch) {
    axios.delete(`${API_URL}/contacts/destroy/${id}`)
    .then(() => {
      dispatch(destroyContactSuccess(index));
    });
  }
};