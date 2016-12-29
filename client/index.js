// dependencies
import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
// components & modules’
import AssessmentContainer from './containers/AssessmentContainer.jsx';
import store from './store/AssessmentStore.jsx';

ReactDOM.render(
  <Provider store={store}>
    <AssessmentContainer />
  </Provider>,
  document.getElementById('root-assessment')
);
