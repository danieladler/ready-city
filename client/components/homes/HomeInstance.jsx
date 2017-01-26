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
    const authenticity_token = this.refs.Token.value;
    const address = this.refs.Address.value;
    const city = this.refs.City.value;
    const state = this.refs.State.value;
    const zip = this.refs.Zip.value;
    const year_built = this.refs.YearBuilt.value;
    const floor_count = this.refs.Floor_count.value;
    const is_house = this.refs.Is_house.value;
    const {home, index} = this.props;
    const id = home.id;
    const userId = home.user_id;
    const params = {
      authenticity_token,
      address,
      city,
      state,
      zip,
      year_built,
      floor_count,
      is_house
    }
    this.props.updateHome(id, params, index, userId);
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
      });
      return(mapped);
    }

    const renderSuccess = (success, id) => {
      const alertSuccess = (
        '<p class="alert alert-success">' + success + '</p>'
      );

      const renderTarget = "div[data-home-id=" + id +"]"
      $(renderTarget).append(alertSuccess);

      setTimeout(() => {
        $('.alert-success').remove()
      }, 2000);

    }

    const { home } = this.props;
    const token = $('meta[name="csrf-token"]').attr('content');
    return (
      <div>
        <form onSubmit={this.handleFormSubmit} className="form form-assessment form-update-instance">
          <input type="hidden" ref="Token" name="authenticity_token" value={token} readOnly={true} />
          <Field ref="Address" name="address" type="text" component={renderField} label="Address"/>
          <Field ref="City" name="city" type="text" component={renderField} label="City"/>
          <Field ref="State" name="state" type="text" component={renderField} label="State"/>
          <Field ref="Zip" name="zip" type="text" component={renderField} label="Zip"/>
          <Field ref="YearBuilt" name="year_built" type="text" component={renderField} label="Year Built"/>
          <div className="form-group">
            <label className="label-assessment-form">Floor Count</label>
            <Field ref="Floor_count" name="floor_count" component="select" label="Floor">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </Field>
          </div>
          <div className="form-group">
            <label className="label-assessment-form">House or Apartment?</label>
            <Field ref="Is_house" name="is_house" component="select">
              <option value="true">House</option>
              <option value="false">Apartment</option>
            </Field>
          </div>
          <div className="alert-container" data-home-id={home.id}>
            { home.errors ? renderErrors(home.errors) : null }
            { home.success ? renderSuccess(home.success, home.id) : null }
          </div>
          <button action="submit" className="button button-form button-submit">Save changes</button>
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
