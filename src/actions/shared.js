import { getInitialData, saveQuestion, saveQuestionAnswer } from '../utils/api'
import { receiveUsers, addUserQuestionAnswer, addUserQuestion } from '../actions/users'
import { receiveQuestions, addQuestionAnswer, addQuestion } from '../actions/questions'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(hideLoading())
      })
  }
}

export function handleAddQuestionAnswer (questionId, selectedOption, loggedInUser) {
    return (dispatch, getState) => {
        dispatch(showLoading());

        saveQuestionAnswer({
            authedUser: loggedInUser.id,
            qid: questionId,
            answer: selectedOption
        }).then(() => {
            dispatch(addQuestionAnswer(loggedInUser.id, questionId, selectedOption));
            dispatch(addUserQuestionAnswer(loggedInUser.id, questionId, selectedOption));
            dispatch(hideLoading());
        });
    }
}

export function handleAddQuestion (optionOneText, optionTwoText, loggedInUser) {
    return (dispatch, getState) => {
        dispatch(showLoading());

        saveQuestion({
            optionOneText: optionOneText,
            optionTwoText: optionTwoText,
            author: loggedInUser.id
        }).then((question) => {
            dispatch(addUserQuestion(question));
            dispatch(addQuestion(question));
            dispatch(hideLoading());
        });
    }
}