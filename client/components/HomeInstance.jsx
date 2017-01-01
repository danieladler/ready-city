import React, { PropTypes } from 'react';
import { reduxForm, Field, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { UPDATE_HOME } from '../constants/HomeConstants.jsx';
import { bindActionCreators } from 'redux'
import * as actions from '../actions/HomeAssessmentActionCreators.jsx';

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
    const {home, index} = this.props;
    const id = home.id;
    const params = {
      address,
      city,
      state,
      zip,
      year_built,
      // is_house
      // floor_count
    }
    this.props.updateHome(id, params, index);
  }

  render() {
    const { home, handleSubmit } = this.props;
    const token = $('meta[name="csrf-token"]').attr('content');
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input type="hidden" name="authenticity_token" value={token} readOnly={true} />
          <div>
            <label> Address: </label>
            <Field ref="Address" name="address" type="text" component="input"/>
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
            <label> State: </label>
            <Field ref="Zip" name="zip" type="text" component="input"/>
            {home.zip}
          </div>
          <div>
            <label> State: </label>
            <Field ref="YearBuilt" name="year_built" type="text" component="input"/>
            {home.year_built}
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
