import React, { PropTypes } from 'react';
import { reduxForm, Field, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/DependentAssessmentActionCreators.jsx';

class DependentForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleDestroyDependent = this.handleDestroyDependent.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const authenticity_token = this.refs.Token.value;
    const name = this.refs.Name.value;
    const human = this.refs.Human.value;
    const {dependent, index} = this.props;
    const id = dependent.id;
    const userId = dependent.user_id;
    const params = {
      authenticity_token,
      name,
      human
    }
    this.props.updateDependent(id, params, index, userId);
  }

  handleDestroyDependent(event) {
    event.preventDefault();
    const authenticity_token = this.refs.Token.value;
    const {dependent, index} = this.props;
    const id = dependent.id
    this.props.destroyDependent(authenticity_token, id, index);
  }

  render() {
    const renderField = ({ input, label, type }) => (
      <div className="form-group">
        <label className="label-assessment-form">{label}</label>
        <input className="input-assessment-form" {...input} placeholder={label} type={type}/>
      </div>
    )

    const renderErrors = (errors) => {
      const mapped = errors.map((error, index) => {
        return(<p key={index} className="alert alert-error">{error}</p>);
;
      });
      return(mapped);
    }

    const renderSuccess = (success, id) => {
      console.log("Dependent success messages to be implemented in a future branch");
    }

    const { dependent } = this.props;
    const token = $('meta[name="csrf-token"]').attr('content');
    return (
      <div>
        <form onSubmit={this.handleFormSubmit} className="form form-assessment form-update-instance">
          <input type="hidden" ref="Token" name="authenticity_token" value={token} readOnly={true} />
          <Field ref="Name" name="name" type="text" component={renderField} label="Name"/>
          <div className="form-group">
            <label className="label-assessment-form">Human or Pet?</label>
            <Field ref="Human" name="human" component="select">
              <option value="true">Human</option>
              <option value="false">Pet</option>
            </Field>
          </div>
          <div className='alert-container' data-dependent-id={dependent.id}>
            { dependent.errors ? renderErrors(dependent.errors) : null }
            { dependent.success ? renderSuccess(dependent.success, dependent.id) : null }
          </div>
          <button action="submit" className="button button-form button-submit">Save changes</button>
        </form>
        <button onClick={this.handleDestroyDependent} className="button button-form button-delete"> Delete </button>
        <br/>
        <br/>
    </div>
    )
  }
}

const DependentReduxForm = reduxForm()(DependentForm);

const ConnectedDependentInstance = connect((state, props) => {
  return {
    initialValues: props.dependent,
    index: props.index,
    form: `dependent-${props.index}`,
    enableReinitialize: true
  };
})(DependentReduxForm);

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(actions, dispatch)
);

const DependentInstance = connect(null, mapDispatchToProps)(ConnectedDependentInstance);

export default DependentInstance;
