import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleAddQuestionAnswer} from '../actions/shared';
import {Redirect} from "react-router-dom";
import includes from 'core-js/fn/array/includes';

class DisplayQuestion extends Component {
  
    state = {
        selectedOption: ''
    };

    handleSubmit(e, id) {
        e.preventDefault();

        const {dispatch, loggedInUser} = this.props;
        const {selectedOption} = this.state;

        dispatch(handleAddQuestionAnswer(id, selectedOption, loggedInUser));

        this.setState(() => ({
            selectedOption: ''
        }));
    }

    handleInputChange = (e) => {
        const text = e.target.value;
        this.setState(() => ({
            selectedOption: text
        }));
    };

  
  render() {
    const {loggedInUser, location} = this.props;
    if(!loggedInUser) {
        return <Redirect to={{
          pathname: "/",
          state: { referrer: location.pathname }
        }}/>

    }

    const {question, askingUser} = this.props;

    if(!question) {
        return <Redirect to={{
          pathname: "/invalid"
        }}/>

    }


    const {selectedOption} = this.state;

    const hasAnswered = includes(question.optionOne.votes, loggedInUser.id) || includes(question.optionTwo.votes, loggedInUser.id)

    const totalAnswers = question.optionOne.votes.length + question.optionTwo.votes.length;
    const optionOnePct = Math.round((question.optionOne.votes.length / totalAnswers) * 100);
    const optionTwoPct = Math.round((question.optionTwo.votes.length / totalAnswers) * 100);

    return(
      <div className='row justify-content-center col-sm-8 center'>
          <div className='margin-top-10 card'>
            <div className='card-header'><strong>{askingUser.name} asks: </strong></div>

          <div className='card-body row'>
              <div className='col-sm-4 border-right center'>
                  <img src={askingUser.avatarURL} alt={`Avatar of ${askingUser.name}`} className='height-100'/>
              </div>
              <div className='col-sm-8 question-info'>
              {!hasAnswered && (
                      <form onSubmit={(e) => this.handleSubmit(e, question.id)}>
                          <p className='left'><strong>Would you rather:</strong></p>
                          <div className="form-check">
                              <input className="form-check-input" type="radio" name="questionPoll" id="optionOne" value="optionOne" onChange={this.handleInputChange}/>{question.optionOne.text}
                          </div>
                          <div className="form-check">
                              <input className="form-check-input" type="radio" name="questionPoll" id="optionTwo" value="optionTwo" onChange={this.handleInputChange}/>{question.optionTwo.text}
                          </div>
                          <button className='btn btn-outline-primary reset-vertical-margin' type='submit' disabled={selectedOption === ''}> Submit </button>
                      </form>
              )}

              {hasAnswered && (
                <div className='col-sm-12 '>
                    <div className='results-header'>Results:</div>
                    <div className='card'> Would you rather {question.optionOne.text}?
                        <div className="progress">
                            <div className="progress-bar" style={{ width: optionOnePct + '%' }} ></div>
                        </div>
                        <div>
                            <span>{question.optionOne.votes.length} out of {totalAnswers} votes. ({optionOnePct}%)</span>
                        </div>
                    </div>
                    <div className='card'>Would you rather {question.optionTwo.text}?
                        <div className="progress"> <div className="progress-bar" style={{ width: optionTwoPct + '%' }}></div>
                        </div>
                        <div>
                            <span>{question.optionTwo.votes.length} out of {totalAnswers} votes. ({optionTwoPct}%)</span>
                        </div>
                    </div>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      )
  }
}

function mapStateToProps({authedUser, questions, users}, props) {
  const {id} = props.match.params;
  const question = questions[id];
  let askingUser = null;
  if(authedUser.loggedInUser && question) {
    askingUser = users[question.author];
  }

   return {
     question: question,
     askingUser,
     loggedInUser : authedUser.loggedInUser
  }
}

export default connect(mapStateToProps)(DisplayQuestion);