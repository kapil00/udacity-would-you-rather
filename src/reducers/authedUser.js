import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from '../actions/users'

export default function authedUser (state = {}, action) {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedInUser: action.loggedInUser
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggedInUser: null
      };
    default :
      return state
  }
}