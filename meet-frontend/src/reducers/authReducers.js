import * as auth from '../constants/authConstants'

const initialState = {
  isAuthenticated: false,
  user: null,
  userId: null,
  email: null,
  token: null,
  error: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case auth.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.username,
        token: action.payload.token,
        userId: action.payload.id,
        error: null
      }

    case auth.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload
      }
    case auth.REGISTER_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload
      }
    case auth.REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.username,
        token: action.payload.token,
        userId: action.payload.id,
        error: null
      }
    case auth.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        userId: null,
        error: null
      }
    default:
      return state
  }
}

export default authReducer
