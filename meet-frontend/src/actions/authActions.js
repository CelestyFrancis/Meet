import * as actionTypes from '../constants/authConstants'
import * as authService from '../services/authServices'

export const loginUser = userData => async dispatch => {
  try {
    await authService.loginUser(userData) // Call the loginUser service function
    dispatch({ type: actionTypes.LOGIN_SUCCESS })
  } catch (error) {
    dispatch({ type: actionTypes.LOGIN_FAILURE, payload: error.message })
  }
}
