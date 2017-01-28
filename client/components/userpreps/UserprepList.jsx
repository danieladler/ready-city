import React, { PropTypes } from 'react';
import UserprepInstance from './UserprepInstance.jsx';

class UserprepList extends React.Component {
  render() {
    const userpreps = this.props.userpreps.all.map((userprep, index) => {
      return (
        <div key={index} className="wrapper-instance">
          <UserprepInstance
            index={index}
            userprep={userprep} />
        </div>
      )
    })

    return (
      <div>
        <h1 className="alert-temp alert-error"> Hello!! </h1>
        <h2 className="alert-temp">
          This page is a work in progress. It's not very pretty right now but it
          will soon become the centerpiece of the app.
        </h2>
        <h2 className="alert-temp">
          Check the latest commits in the <a href="https://www.github.com/danieladler/ready-city">
          Ready City repo </a> for an idea of upcoming updates.
        </h2>
        {userpreps}
      </div>
    )
  }
}

export default UserprepList;
