import React from 'react'
import { Field, reduxForm } from 'redux-form'

class CreateZoneForm extends React.Component {
  render() {
    const renderDependents = (dependents) => {
      const dependentsAsOptions = dependents.all.map(function(dependent, index) {
        return(
          <option key={index} value={dependent.id}>{dependent.name}</option>
        )
      });
      return(dependentsAsOptions);
    }

    const renderErrors = (errors) => {
      const mapped = errors.map(function(error, index) {
        return(<p key={index}><strong>{error}</strong></p>);
      });
      return(mapped);
    }

    const { handleSubmit, zones, dependents } = this.props;
    const token = $('meta[name="csrf-token"]').attr('content');

    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="authenticity_token" value={token} readOnly={true} />
          <div>
            <label>Add a new zone</label>
            <div>
              <label>Name</label>
              <Field name="name" component="input" type="text" placeholder="name"/>
            </div>
            <div>
              <label>Address</label>
              <Field name="address" component="input" type="text" placeholder="address"/>
            </div>
            <div>
              <label>City</label>
              <Field name="city" component="input" type="text" placeholder="city"/>
            </div>
            <div>
              <label>State</label>
              <Field name="state" component="input" type="text" placeholder="state"/>
            </div>
            <div>
              <label>Zip</label>
              <Field name="zip" component="input" type="text" placeholder="zip"/>
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
              <option value="">[select]</option>
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
