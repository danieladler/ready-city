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
    const {home, index} = this.props;
    const id = home.id;
    const params = {
      address
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
