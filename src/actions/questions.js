export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER';
export const ADD_QUESTION = 'ADD_QUESTION';

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}

export function addQuestionAnswer(userId, questionId, selectedOption) {
    return {
        type: ADD_QUESTION_ANSWER,
        userId,
        questionId,
        selectedOption
    }
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}
