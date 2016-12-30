import React, { PropTypes } from 'react';

class HomeInstance extends React.Component {
  render() {
    const { home } = this.props;
    return (
      <div>
        <h4> Address: { home.address } </h4>
        <h4> City: { home.city } </h4>
      </div>
    )
  }
}

export default HomeInstance;
