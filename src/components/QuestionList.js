import React, {Component} from 'react';
import {connect} from 'react-redux';
import Question from './Question';

import includes from 'core-js/fn/array/includes';

class QuestionList extends Component {

    state = {
        currentTab: 'unanswered'
    };

    changeTab = (e, tab) => {
        this.setState(() => ({
            currentTab: tab
        }));
    };

    showQuestionForCurrentTab = (question, currentTab, loggedInUser) => {
      const hasAnswered = includes(question.optionOne.votes, loggedInUser.id) || includes(question.optionTwo.votes, loggedInUser.id)
      if(currentTab === 'unanswered') {
        return !hasAnswered;
      } else {
        return hasAnswered;
      }
    };

    render() {
      const {currentTab} = this.state;
      const {questions, loggedInUser} = this.props;

      let questionsToShow = Object.values(questions).filter(
        (question) => this.showQuestionForCurrentTab(question, currentTab, loggedInUser))
        .sort((a, b) => b.timestamp - a.timestamp);

      return (
        <div className='container'>
          <div className='row justify-content-center col-sm-8 center'>
            <button type='button'
                    className={"btn btn-info " + (currentTab === 'unanswered' ? 'active' : null)}
                    onClick={(e) => this.changeTab(e, 'unanswered')}>Unanswered
                Questions
            </button>
            <button type='button'
                    className={"btn btn-info " + (currentTab === 'answered' ? 'active' : null)}
                    onClick={(e) => this.changeTab(e, 'answered')}>Answered
                Questions
            </button>

            <div className='col-sm-8'>
              {questionsToShow.map((question) => {
                  return (
                      <Question key={question.id} id={question.id}/>
                  )
              })}
            </div>
          </div>
        </div>
      )
    }
}

function mapStateToProps({authedUser, questions}) {
   return {
     loggedInUser : authedUser.loggedInUser,
     questions
  }
}

export default connect(mapStateToProps)(QuestionList);