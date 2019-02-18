import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoginForm from './LoginForm';
import QuestionList from './QuestionList';
import {Redirect} from "react-router-dom";

class HomePage extends Component {
  render() {
    const { loggedInUser, location } = this.props
    
    if(!loggedInUser) {
      return <LoginForm />
    }
    
    if (location.state && location.state.referrer) {
      return <Redirect to={location.state.referrer}/>;
    }

    return <QuestionList />
  }
}

function mapStateToProps({authedUser}) {
    return {
      loggedInUser : authedUser.loggedInUser
    }
}

export default connect(mapStateToProps)(HomePage);
