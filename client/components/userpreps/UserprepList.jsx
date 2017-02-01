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
      return(
        <h3> Loading... </h3>
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
