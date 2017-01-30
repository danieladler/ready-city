import React from 'react'
import { Field, reduxForm } from 'redux-form'

class CreateDependentForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.toggleExpander = this.toggleExpander.bind(this)
    this.state = {expanderHidden: "expander-hidden"};
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const authenticity_token = this.refs.Token.value;
    const name = this.refs.Name.value;
    const human = this.refs.Human.value;
    const userId = this.props.params.userId
    const params = {
      authenticity_token,
      name,
      human
    }
    this.props.createDependent(params, userId);
  }

  toggleExpander(event) {
    event.preventDefault();
    if (this.state.expanderHidden == "expander-hidden") {
      this.setState({expanderHidden: "expander-showing"})
    } else {
      this.setState({expanderHidden: "expander-hidden"})
    }
  }

  render() {
    const renderErrors = (errors) => {
      const mapped = errors.map((error, index) => {
        return(<p key={index} className="alert alert-error">{error}</p>);
      });
      return(mapped);
    }

    const { dependents } = this.props;
    const token = $('meta[name="csrf-token"]').attr('content');

    return (
      <div className="wrapper-create-form">
        <a href="#" className={"expander-trigger " + this.state.expanderHidden} onClick={this.toggleExpander}>
          <h3 className="title title-form title-form-section">Add a new dependent</h3>
        </a>
        <div className="expander-content">
          <form onSubmit={this.handleFormSubmit} className="form form-assessment form-create-instance">
            <input type="hidden" ref="Token" name="authenticity_token" value={token} readOnly={true} />
            <div className="form-group">
              <label className="label-assessment-form"> Name </label>
              <Field ref="Name" name="name" component="input" type="text" className="input-assessment-form"/>
            </div>
            <div className="form-group">
              <label className="label-assessment-form">Human or Pet?</label>
              <Field ref="Human" name="human" component="select">
                <option value="">[Select]</option>
                <option value="true">Human</option>
                <option value="false">Pet</option>
              </Field>
            </div>
            <div className='alert-container' data-dependent-id='create-dependent-error'>
              { dependents.errors ? renderErrors(dependents.errors) : null }
            </div>
            <div>
              <button type="submit" className="button button-form button-submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'CreateDependentForm'
})(CreateDependentForm)
