// dependencies
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Link, browserHistory } from 'react-router'

// components & modules
import AssessmentContainer from './containers/AssessmentContainer.jsx';
import PreparationContainer from './containers/PreparationContainer.jsx';
import store from './store/AssessmentStore.jsx';

const MainApp = ({params, children}) => {
   const {userId} = params;
   return (
     <div>
       I am the main app.
       <a href="/">Home</a>
       <Link to={`/users/${userId}`} activeClassName="active">Profile</Link>
       <Link to={`/preparations/${userId}`} activeClassName="active">Prepare</Link>
       {children}
     </div>
   );
 }

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={MainApp}>
        <Route path="preparations/:userId" component={PreparationContainer} />
        <Route path="users/:userId" component={AssessmentContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
