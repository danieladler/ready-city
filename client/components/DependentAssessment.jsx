import React, { PropTypes } from 'react';
import DependentInstance from './DependentInstance.jsx';

class DependentAssessment extends React.Component {
  render() {
    var _this = this,
        dependents = this.props.dependents.all.map(function(dependent, index) {
          return (
            <div key={index}>
              <DependentInstance
                index={index}
                dependent={dependent} />
            </div>
          )
        })
    return (
      <div>
        <h2> Dependents: </h2>
        { dependents }
      </div>
    )
  }
}

export default DependentAssessment;
