import { combineReducers } from 'redux'
import users from './users'
import questions from './questions'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  users,
  tweets,
  loadingBar: loadingBarReducer,
})