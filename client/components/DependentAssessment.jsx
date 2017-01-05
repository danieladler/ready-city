import React, { PropTypes } from 'react';
import DependentInstance from './DependentInstance.jsx';
import CreateDependentForm from './CreateDependentForm.jsx';

class DependentAssessment extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(params) {
    this.props.createDependent(params);
  }

  render() {
    var dependents = this.props.dependents.all.map(function(dependent, index) {
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
        <CreateDependentForm {...this.props} onSubmit={this.handleSubmit}/>
      </div>
    )
  }
}

export default DependentAssessment;
