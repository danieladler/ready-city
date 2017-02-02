import React, { PropTypes } from 'react';

class UserprepInstance extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  handleCheckboxChange(event) {
    event.preventDefault();
    const authenticity_token = this.refs.Token.value;
    const { userprep } = this.props
    const id = userprep.id;
    const completed = !userprep.completed;
    const params = {
      authenticity_token,
      id,
      completed
    }
    // console.log(params);
    this.props.toggleUserprepComplete(id, params);
  }

  render() {
    const { userprep } = this.props;
    const token = $('meta[name="csrf-token"]').attr('content');
    return (
      <form className="userprep-instance">
        <input type="hidden" ref="Token" name="authenticity_token" value={token} readOnly={true} />
        <label>
          <input
            name="instructions"
            type="checkbox"
            checked={userprep.completed}
            onChange={this.handleCheckboxChange} />
          <span> {userprep.instructions} </span>
        </label>
      </form>
    )
  }
}

export default UserprepInstance;
