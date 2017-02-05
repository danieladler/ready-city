import React, { PropTypes } from 'react';
import { reduxForm, Field, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/UserprepActionCreators.jsx';

class UserPrepForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleToggleComplete = this.handleToggleComplete.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.toggleExpander = this.toggleExpander.bind(this)
    this.state = {
      expanderHidden: "expander-hidden",
      completed: `completed-${this.props.userprep.completed}`
    };
  }

  handleFormSubmit(event) {
    event.preventDefault();

    // TBD

    // const authenticity_token = this.refs.Token.value;
    // const { userprep, index } = this.props
    // const id = userprep.id;
    // const params = {
    //   authenticity_token,
    // }
    // this.props.updateUserprep(id, params, index)
  }

  handleToggleComplete(event) {
    event.preventDefault();
    const authenticity_token = this.refs.Token.value;
    const { userprep, index, visibilityFilter } = this.props
    const id = userprep.id;
    const userId = userprep.user_id;
    const completed = !userprep.completed;
    const updateTypeFlag = 'toggleCompleted'
    const params = {
      authenticity_token,
      completed,
      updateTypeFlag
    }
    this.props.toggleUserprepComplete(id, params, visibilityFilter, index, userId)
  }

  toggleExpander(event) {
    event.preventDefault();
    if (this.state.expanderHidden == "expander-hidden") {
      this.setState({expanderHidden: "expander-showing"})
    } else {
      this.setState({expanderHidden: "expander-hidden"})
    }
  }

  render() {
    const renderField = ({ input, label, type }) => (
      <div>
        <label>{label}</label>
        <input {...input} placeholder={label} type={type}/>
      </div>
    )

    const { userprep } = this.props;
    const cost = (userprep.total_cost_in_cents/100)
    const token = $('meta[name="csrf-token"]').attr('content');
    return (
      <div>
        <a href="#" className={"expander-trigger " + this.state.expanderHidden} onClick={this.toggleExpander}>
          <span className={`title title-form title-form-section title-userprep completed-${this.props.userprep.completed}`}>{userprep.keyword}</span>
        </a>
        <div className="expander-content">
          <form className="form form-userprep form-userprep-instance" onSubmit={this.handleFormSubmit} >
            <input type="hidden" ref="Token" name="authenticity_token" value={token} readOnly={true} />
            <div> Todo: {userprep.instructions} </div>
            <div> Completed: {String(userprep.completed)} </div>
            <button onClick={this.handleToggleComplete} className="button button-form button-submit">Done</button>
          </form>
        </div>
      </div>
    )
  }
}

const UserPrepReduxForm = reduxForm()(UserPrepForm)

const ConnectedUserprepInstance = connect((state, props) => {
  return {
    initialValues: props.userprep,
    index: props.index,
    form: `userprep-${props.index}`,
    enableReinitialize: true
  };
})(UserPrepReduxForm);

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(actions, dispatch)
);

const UserprepInstance = connect(null, mapDispatchToProps)(ConnectedUserprepInstance);

export default UserprepInstance;
