import React, {Component} from 'react';
import {connect} from 'react-redux';
import LoginForm from './LoginForm';
import QuestionList from './QuestionList';

class HomePage extends Component {
  render() {
    const { loggedInUser } = this.props
    
    if(!loggedInUser) {
      return <LoginForm />
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
