import React, { PropTypes } from 'react';
import UserprepInstance from './UserprepInstance.jsx';

class UserprepList extends React.Component {
  render() {
    var userprepsToRender;
    const userpreps = this.props.userpreps.all || this.props.userpreps;
    if (userpreps.length > 0) {
      userprepsToRender = userpreps.map((userprep, index) => {
        return (
          <div key={index} className="wrapper-instance">
            <UserprepInstance
              index={index}
              userprep={userprep} />
          </div>
        )
      })
    } else {
      return (
        <div className="wrapper wrapper-alert">
          <h3 className="alert alert-warning"> You don't have any preparations of this type. </h3>
        </div>
      )
    }

    return (
      <div className="userprep-main">
        {userprepsToRender}
      </div>
    )
  }
}

export default UserprepList;
