import React, { PropTypes } from 'react';
import { reduxForm, Field, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/HomeAssessmentActionCreators.jsx';

class HomeForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const address = this.refs.Address.value;
    const city = this.refs.City.value;
    const state = this.refs.State.value;
    const zip = this.refs.Zip.value;
    const year_built = this.refs.YearBuilt.value;
    const floor_count = this.refs.Floor_count.value;
    const is_house = this.refs.Is_house.value;
    const {home, index} = this.props;
    const id = home.id;
    const params = {
      address,
      city,
      state,
      zip,
      year_built,
      floor_count,
      is_house
    }
    this.props.updateHome(id, params, index);
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
      var successMessage = (
        '<p class="success-message"><strong> ' + success + '</strong></p>'
      );

      var renderTarget = "div[data-home-id=" + id +"]"
      $(renderTarget).append(successMessage);

      setTimeout(function(){
        $('.success-message').remove()
      }, 2000);

    }

    const { home, handleSubmit } = this.props;
    const token = $('meta[name="csrf-token"]').attr('content');
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input type="hidden" name="authenticity_token" value={token} readOnly={true} />
          <div>
            <Field ref="Address" name="address" type="text" component={renderField} label="Address"/>
            {home.address}
          </div>
          <div>
            <label> City: </label>
            <Field ref="City" name="city" type="text" component="input"/>
            {home.city}
          </div>
          <div>
            <label> State: </label>
            <Field ref="State" name="state" type="text" component="input"/>
            {home.state}
          </div>
          <div>
            <Field ref="Zip" name="zip" type="text" component={renderField} label="Zip"/>
            {home.zip}
          </div>
          <div>
            <label> Year Built: </label>
            <Field ref="YearBuilt" name="year_built" type="text" component="input"/>
            {home.year_built}
          </div>
          <div>
            <label>Floor Count</label>
            <Field ref="Floor_count" name="floor_count" component="select">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </Field>
          </div>
          <div>
            <label>House or Apartment?</label>
            <Field ref="Is_house" name="is_house" component="select">
              <option value="true">House</option>
              <option value="false">Apartment</option>
            </Field>
          </div>
          <div className="message-container" data-home-id={home.id}>
            { home.errors ? renderErrors(home.errors) : null }
            { home.success ? renderSuccess(home.success, home.id) : null }
          </div>
          <button action="submit">Save changes</button>
        </form>
      </div>
    )
  }
}

const HomeReduxForm = reduxForm()(HomeForm);

const ConnectedHomeInstance = connect((state, props) => {
  return {
    initialValues: props.home,
    index: props.index,
    form: `home-${props.index}`,
  };
})(HomeReduxForm);

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(actions, dispatch)
);

const HomeInstance = connect(null, mapDispatchToProps)(ConnectedHomeInstance);

export default HomeInstance;
