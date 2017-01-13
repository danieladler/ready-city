import React, { PropTypes } from 'react';
import DependentInstance from './DependentInstance.jsx';
import CreateDependentForm from './CreateDependentForm.jsx';

class DependentAssessment extends React.Component {
  render() {
    var dependents = this.props.dependents.all.map((dependent, index) => {
      return (
        <div key={index}>
          <DependentInstance
            index={index}
            dependent={dependent} />
        </div>
      )
    })

    return (
      <div >
        <h2> Dependents: </h2>
        { dependents }
        <CreateDependentForm {...this.props} />
      </div>
    )
  }
}

export default DependentAssessment;
