import * as actionTypes from '../constants/authConstants'
import authService from '../services/authServices.js'

export const loginUser = userData => async dispatch => {
  try {
    const data = await authService.loginUser(userData)
    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: actionTypes.LOGIN_FAILURE, payload: error.message })
  }
}

export const registerUser = userData => async dispatch => {
  try {
    const data = await authService.registerUser(userData)
    dispatch({ type: actionTypes.REGISTER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: actionTypes.REGISTER_FAILURE, payload: error.message })
  }
}

export const logout = () => async dispatch => {
  dispatch({ type: actionTypes.LOGOUT })
}
