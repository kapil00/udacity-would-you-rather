import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {handleUserLogout} from '../actions/users';

class Nav extends Component {

  performLogout = (e) => {
    this.props.dispatch(handleUserLogout())
  };

  render() {
    const { loggedInUser } = this.props
    if(!loggedInUser) {
        return null;
    }

    return (
          <div className="container navbar navbar-expand navbar-light bg-light">
            <ul className="navbar-nav">
              <NavLink to='/' exact activeClassName='active' className="nav-item nav-link">Home</NavLink>
              <NavLink to='/add' exact activeClassName='active' className="nav-item nav-link">New Question</NavLink>
              <NavLink to='/leaderboard' exact activeClassName='active' className="nav-item nav-link">Leaderboard</NavLink>
              <span Style="margin-left:100px;margin-right:25px" className="navbar-text text-info">Hello,  {loggedInUser.name}</span>
              <button type='button' className="btn-sm btn-info" onClick={(e) => this.performLogout(e)}>Logout</button>
            </ul>
          </div>
    )
  }
}

function mapStateToProps({authedUser}) {
    return {
        loggedInUser: authedUser.loggedInUser
    }
}

export default connect(mapStateToProps)(Nav);