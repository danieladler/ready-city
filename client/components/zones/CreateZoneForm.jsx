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
    this.props.createZone(params);
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
        return(<p key={index}><strong>{error}</strong></p>);
      });
      return(mapped);
    }

    const { zones, dependents } = this.props;
    const token = $('meta[name="csrf-token"]').attr('content');

    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input type="hidden" ref="Token" name="authenticity_token" value={token} readOnly={true} />
          <div>
            <label>Add a new zone</label>
            <div>
              <label>Name</label>
              <Field ref="Name" name="name" component="input" type="text" placeholder="name"/>
            </div>
            <div>
              <label>Address</label>
              <Field ref="Address" name="address" component="input" type="text" placeholder="address"/>
            </div>
            <div>
              <label>City</label>
              <Field ref="City" name="city" component="input" type="text" placeholder="city"/>
            </div>
            <div>
              <label>State</label>
              <Field ref="State" name="state" component="input" type="text" placeholder="state"/>
            </div>
            <div>
              <label>Zip</label>
              <Field ref="Zip" name="zip" component="input" type="text" placeholder="zip"/>
            </div>
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
          <div className='message-container' data-zone-id='create-zone-error'>
            { zones.errors ? renderErrors(zones.errors) : null }
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'CreateZoneForm'
})(CreateZoneForm)
