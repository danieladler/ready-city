import React, { PropTypes } from 'react';
import { reduxForm, Field, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/ZoneAssessmentActionCreators.jsx';

class ZoneForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const name = this.refs.Name.value;
    const address = this.refs.Address.value;
    const city = this.refs.City.value;
    const state = this.refs.State.value;
    const zip = this.refs.Zip.value;
    const zone_type = this.refs.ZoneType.value;
    const {zone, index} = this.props;
    const id = zone.id;
    const params = {
      name,
      address,
      city,
      state,
      zip,
      zone_type
    }
    // this.props.updateZone(id, params, index);
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
      console.log("Zone success messages to be implemented in a future branch");
    }

    const { zone, handleSubmit } = this.props;
    const token = $('meta[name="csrf-token"]').attr('content');
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input type="hidden" name="authenticity_token" value={token} readOnly={true} />
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
          <div className='message-container' data-zone-id={zone.id}>
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
    enableReinitialize: true
  };
})(ZoneReduxForm);

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(actions, dispatch)
);

const ZoneInstance = connect(null, mapDispatchToProps)(ConnectedZoneInstance);

export default ZoneInstance;
