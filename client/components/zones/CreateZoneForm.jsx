import React from 'react'
import { Field, reduxForm } from 'redux-form'

class CreateZoneForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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
    const userId = this.props.params.userId;
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
    this.props.createZone(params, userId);
  }

  render() {
    const renderDependents = (dependents) => {
      const dependentsAsOptions = dependents.all.map((dependent, index) => {
        return(
          <option key={index} value={dependent.id}>{dependent.name}</option>
        )
      });
      return(dependentsAsOptions);
    }

    const renderErrors = (errors) => {
      const mapped = errors.map((error, index) => {
        return(<p key={index} className="alert alert-error">{error}</p>);
;
      });
      return(mapped);
    }

    const { zones, dependents } = this.props;
    const token = $('meta[name="csrf-token"]').attr('content');

    return (
      <div className="wrapper-create-form">
        <form onSubmit={this.handleFormSubmit} className="form form-assessment form-create-instance">
          <input type="hidden" ref="Token" name="authenticity_token" value={token} readOnly={true} />
          <h3 className="title title-form">Add a new zone</h3>
          <div className="form-group">
            <label className="label-assessment-form">Name</label>
            <Field ref="Name" name="name" component="input" type="text" className="input-assessment-form"/>
          </div>
          <div className="form-group">
            <label className="label-assessment-form">Address</label>
            <Field ref="Address" name="address" component="input" type="text" className="input-assessment-form" />
          </div>
          <div className="form-group">
            <label className="label-assessment-form">City</label>
            <Field ref="City" name="city" component="input" type="text" className="input-assessment-form"/>
          </div>
          <div className="form-group">
            <label className="label-assessment-form">State</label>
            <Field ref="State" name="state" component="input" type="text" className="input-assessment-form"/>
          </div>
          <div className="form-group">
            <label className="label-assessment-form">Zip</label>
            <Field ref="Zip" name="zip" component="input" type="text" className="input-assessment-form"/>
          </div>
          <div className="form-group">
            <label className="label-assessment-form">What type of zone is this?</label>
            <Field ref="ZoneType" name="zone_type" component="select">
              <option value="">[select]</option>
              <option value="zone_home">Home</option>
              <option value="zone_work">Work</option>
            </Field>
          </div>
          <div className="form-group">
            <label className="label-assessment-form">Who spends time here?</label>
            <Field ref="DependentId" name="dependent_id" component="select">
              <option value="0">Me</option>
              { dependents? renderDependents(dependents) : null }
            </Field>
          </div>
          <div className='alert-container' data-zone-id='create-zone-error'>
            { zones.errors ? renderErrors(zones.errors) : null }
          </div>
          <div>
            <button type="submit" className="button button-form button-submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'CreateZoneForm'
})(CreateZoneForm)
