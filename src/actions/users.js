import { getUsers } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const PROCESS_USER_LOGIN = 'PROCESS_USER_LOGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const ADD_USER_QUESTION_ANSWER = 'ADD_USER_QUESTION_ANSWER';
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
}

export function handleUserLogin(id) {
    return (dispatch) => {
        dispatch(showLoading());
        getUsers().then((users) => {
            const user = users[id]
            dispatch(receiveUserLogin(user));
            dispatch(hideLoading());
        });
    };
}

export function receiveUserLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        loggedInUser: user
    }
}

export function handleUserLogout() {
    return {
        type: LOGOUT_SUCCESS
    }
}

export function addUserQuestionAnswer(userId, questionId, selectedOption) {
    return {
        type: ADD_USER_QUESTION_ANSWER,
        userId,
        questionId,
        selectedOption
    }
}

export function addUserQuestion(question) {
    return {
        type: ADD_USER_QUESTION,
        question
    }
}
