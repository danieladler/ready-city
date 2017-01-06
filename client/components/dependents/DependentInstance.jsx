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
    const name = this.refs.Name.value;
    const human = this.refs.Human.value;
    const {dependent, index} = this.props;
    const id = dependent.id;
    const params = {
      name,
      human
    }
    this.props.updateDependent(id, params, index);
  }

  handleDestroyDependent(event) {
    event.preventDefault();
    const {dependent, index} = this.props;
    const id = dependent.id
    this.props.destroyDependent(id, index);
  }

  render() {
    const renderField = ({ input, label, type }) => (
      <div>
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type}/>
        </div>
      </div>
    )

    const renderErrors = (errors) => {
      const mapped = errors.map(function(error, index) {
        return(<p key={index}><strong>{error}</strong></p>);
      });
      return(mapped);
    }

    const renderSuccess = (success, id) => {
      console.log("Dependent success messages to be implemented in a future branch");
      // var successMessage = (
      //   '<p class="success-message"><strong> ' + success + '</strong></p>'
      // );
      //
      // var renderTarget = "div[data-dependent-id=" + id +"]"
      // $(renderTarget).append(successMessage);
      //
      // setTimeout(function(){
      //   $('.success-message').remove()
      // }, 2000);

    }

    const { dependent, handleSubmit } = this.props;
    const token = $('meta[name="csrf-token"]').attr('content');
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input type="hidden" name="authenticity_token" value={token} readOnly={true} />
          <div>
            <Field ref="Name" name="name" type="text" component={renderField} label="Name"/>
            {dependent.name}
          </div>
          <div>
            <label>Human or Pet?</label>
            <Field ref="Human" name="human" component="select">
              <option value="true">Human</option>
              <option value="false">Pet</option>
            </Field>
          </div>
          <div className='message-container' data-dependent-id={dependent.id}>
            { dependent.errors ? renderErrors(dependent.errors) : null }
            { dependent.success ? renderSuccess(dependent.success, dependent.id) : null }
          </div>
          <button action="submit">Save changes</button>
        </form>
        <button onClick={this.handleDestroyDependent}> Delete </button>
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
