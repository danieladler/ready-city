import { LOAD_HOME } from '../constants/HomeConstants.jsx';

// define API_URL as a constant

export const loadHome = (testString) => ({
  // define request as a constant with the appropriate CRUD action
  type: LOAD_HOME,
  // payload: request
  testString
});
