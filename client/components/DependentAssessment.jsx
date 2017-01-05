import React, { PropTypes } from 'react';
import DependentInstance from './DependentInstance.jsx';
import AddDependentForm from './AddDependentForm.jsx';

class DependentAssessment extends React.Component {
  handleSubmit(values) {
    console.log(values);
    // this.props.AddDependent(values);
  }

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
      <div id="dependent-assessment-wrapper">
        <h2> Dependents: </h2>
        { dependents }
        <AddDependentForm {...this.props} onSubmit={this.handleSubmit}/>
      </div>
    )
  }
}

export default DependentAssessment;
