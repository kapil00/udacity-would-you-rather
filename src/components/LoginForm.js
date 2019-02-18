import React, {Component} from 'react';
import {connect} from 'react-redux';

import {handleUserLogin} from '../actions/users';

class LoginForm extends Component {
    state = {
        selectedUser: ''
    };

    handleChange = (e) => {
        const selectedUser = e.target.value;
        this.setState(() => ({
            selectedUser
        }));
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch(handleUserLogin(this.state.selectedUser));
    };

  render() {
    const { users } = this.props

    return(
      <div className="container">
        <h2>Login</h2>
        <p>Please select a user to proceed.</p>
        <form id="Login" onSubmit={this.handleSubmit}>
            <div className="form-group">
                <select className="form-control width-200" id="userId" onChange={(e) => this.handleChange(e)}>
                    <option></option>
                    {Object.values(users).map((user) => {
                      return <option key={user.id} value={user.id}>{user.name}</option>
                    })}
                </select>
            </div>

            <button type="submit" className="btn btn-info" disabled={this.state.selectedUser === ''}>Login</button>
        </form>
      </div>
     )
  }
}

function mapStateToProps({users}) {
    return {
      users : users,
    }
}

export default connect(mapStateToProps)(LoginForm);
