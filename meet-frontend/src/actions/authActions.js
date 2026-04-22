import * as actionTypes from '../constants/authConstants'
import { CLEAR_FRIENDS } from '../constants/friendConstants'
import { CLEAR_NOTIFICATIONS_STATE } from '../constants/notificationConstants'
import authService from '../services/authServices.js'

export const loginUser = userData => async dispatch => {
  try {
    const data = await authService.loginUser(userData)
    dispatch({ type: CLEAR_FRIENDS })
    dispatch({ type: CLEAR_NOTIFICATIONS_STATE })
    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: actionTypes.LOGIN_FAILURE, payload: error.message })
  }
}

export const logout = () => dispatch => {
  dispatch({ type: CLEAR_FRIENDS })
  dispatch({ type: CLEAR_NOTIFICATIONS_STATE })
  dispatch({ type: actionTypes.LOGOUT })
}
