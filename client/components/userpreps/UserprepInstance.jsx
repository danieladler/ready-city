import React, { PropTypes } from 'react';
import { reduxForm, Field, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actions from '../../actions/UserprepActionCreators.jsx';

class UserPrepForm extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.toggleExpander = this.toggleExpander.bind(this)
    this.state = {expanderHidden: "expander-hidden"};
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

    // TBD

    // const authenticity_token = this.refs.Token.value;
    // const { userprep, index } = this.props
    // const id = userprep.id;
    // const params = {
    //   authenticity_token,
    // }
    // this.props.toggleUserprepComplete()
  }

  toggleExpander(event) {
    event.preventDefault();
    if (this.state.expanderHidden == "expander-hidden") {
      this.setState({expanderHidden: "expander-showing"})
    } else {
      this.setState({expanderHidden: "expander-hidden"})
    }
  }

  // handleCheckboxChange(event) {
  //   event.preventDefault();
  //   const authenticity_token = this.refs.Token.value;
  //   const { userprep } = this.props
  //   const id = userprep.id;
  //   const completed = !userprep.completed;
  //   const params = {
  //     authenticity_token,
  //     id,
  //     completed
  //   }
  //   // console.log(params);
  //   this.props.toggleUserprepComplete(id, params);
  // }

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
          <span className="title title-form title-form-section">{userprep.keyword}</span>
        </a>
        <div className="expander-content">
          <form className="form form-userprep form-userprep-instance" onSubmit={this.handleFormSubmit} >
            <input type="hidden" ref="Token" name="authenticity_token" value={token} readOnly={true} />
            <div> Todo: {userprep.instructions} </div>
            <div> Cost: {cost} </div>
            <button action="submit" className="button button-form button-submit">Update</button>
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
