import * as auth from '../constants/authConstants'

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  error: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case auth.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null
      }

    case auth.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload.message
      }

    default:
      return state
  }
}

export default authReducer
