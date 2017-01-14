import React, { PropTypes } from 'react';
import { reduxForm, Field, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/ZoneAssessmentActionCreators.jsx';

class ZoneForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleDestroyZone = this.handleDestroyZone.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const authenticity_token = this.refs.Token.value;
    const name = this.refs.Name.value;
    const address = this.refs.Address.value;
    const city = this.refs.City.value;
    const state = this.refs.State.value;
    const zip = this.refs.Zip.value;
    const zone_type = this.refs.ZoneType.value;
    const dependent_id = this.refs.DependentId.value;
    const {zone, index} = this.props;
    const id = zone.id;
    const params = {
      authenticity_token,
      name,
      address,
      city,
      state,
      zip,
      zone_type,
      dependent_id
    }
    this.props.updateZone(id, params, index);
  }

  handleDestroyZone(event) {
    event.preventDefault();
    const authenticity_token = this.refs.Token.value;
    const {zone, index} = this.props;
    const id = zone.id
    this.props.destroyZone(authenticity_token, id, index);
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
      const mapped = errors.map((error, index) => {
        return(<p key={index} className="alert alert-error">{error}</p>);
;
      });
      return(mapped);
    }

    const renderSuccess = (success, id) => {
      console.log("Zone success messages to be implemented in a future branch");
    }

    const renderDependents = (dependents) => {
      const dependentsAsOptions = dependents.all.map((dependent, index) => {
        return(
          <option key={index} value={dependent.id}>{dependent.name}</option>
        )
      });
      return(dependentsAsOptions);
    }

    const { zone, dependents } = this.props;
    const token = $('meta[name="csrf-token"]').attr('content');
    return (
      <div>
        <form onSubmit={this.handleFormSubmit} className="form form-assessment form-update-instance">
          <input type="hidden" ref="Token" name="authenticity_token" value={token} readOnly={true} />
          <div>
            <Field ref="Name" name="name" type="text" component={renderField} label="Name"/>
            {zone.name}
          </div>
          <div>
            <Field ref="Address" name="address" type="text" component={renderField} label="Address"/>
            {zone.address}
          </div>
          <div>
            <label> City: </label>
            <Field ref="City" name="city" type="text" component="input"/>
            {zone.city}
          </div>
          <div>
            <label> State: </label>
            <Field ref="State" name="state" type="text" component="input"/>
            {zone.state}
          </div>
          <div>
            <Field ref="Zip" name="zip" type="text" component={renderField} label="Zip"/>
            {zone.zip}
          </div>
          <div>
            <label>What type of zone is this?</label>
            <Field ref="ZoneType" name="zone_type" component="select">
              <option value="">[select]</option>
              <option value="zone_home">Home</option>
              <option value="zone_work">Work</option>
            </Field>
          </div>
          <div>
            <label>Who spends time here?</label>
            <Field ref="DependentId" name="dependent_id" component="select">
              <option value="0">Me</option>
              { dependents? renderDependents(dependents) : null }
            </Field>
          </div>
          <div className='alert-container' data-zone-id={zone.id}>
            { zone.errors ? renderErrors(zone.errors) : null }
            { zone.success ? renderSuccess(zone.success, zone.id) : null }
          </div>
          <button action="submit">Save changes</button>
        </form>
        <button onClick={this.handleDestroyZone}> Delete </button>
        <br/>
        <br/>
    </div>
    )
  }
}

const ZoneReduxForm = reduxForm()(ZoneForm);

const ConnectedZoneInstance = connect((state, props) => {
  return {
    initialValues: props.zone,
    index: props.index,
    form: `zone-${props.index}`,
    enableReinitialize: true,
    dependents: state.dependents
  };
})(ZoneReduxForm);

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(actions, dispatch)
);

const ZoneInstance = connect(null, mapDispatchToProps)(ConnectedZoneInstance);

export default ZoneInstance;
