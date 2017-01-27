// dependencies
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'

// components & modules
import MainAppContainer from './containers/MainAppContainer.jsx';
import AssessmentContainer from './containers/AssessmentContainer.jsx';
import UserprepContainer from './containers/UserprepContainer.jsx';
import store from './store/AssessmentStore.jsx';

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={(props) => (<MainAppContainer {...props} />)}>
        <Route path="userpreps/:userId" component={UserprepContainer}/>
        <Route path="users/:userId" component={AssessmentContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
