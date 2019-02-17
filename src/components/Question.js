import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const Question = (props) => {

const {question, askingUser} = props;
  

    return (
      <div className='margin-top-10 card'>
        <div className='card-header'><strong>{askingUser.name} asks:</strong></div>
        <div className='card-body row'>
            <div className='col-sm-4 border-right center'>
                <img src={askingUser.avatarURL} alt={`Avatar of ${askingUser.name}`} className='avatar' Style="height:100px"/>
            </div>
            <div className='col-sm-8'>
                <div className='question-info'>
                    <p className='left'><strong>Would you rather:</strong></p>
                    <p className='center'>{question.optionOne.text} <strong>OR</strong> {question.optionTwo.text}</p>
                    <Link to={`/questions/${question.id}`} className='center'>
                        <button className='btn btn-outline-primary reset-vertical-margin'>View Poll</button>
                    </Link>
                </div>
            </div>
        </div>
      </div>
    )
}

function mapStateToProps({users, questions}, {id}) {
  const question = questions[id];
  const askingUser = users[question.author];
    return {
      question: question,
      askingUser
    }
}

export default connect(mapStateToProps)(Question);