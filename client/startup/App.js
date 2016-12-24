import React from 'react';

const App = React.createClass({
  getInitialState: function () {
    return {
      data: []
    };
  },
  render: function () {
    return (
      <div className='App'>
        <h1> React Component Visible! </h1>
      </div>
    )
  }
});

export default App;
