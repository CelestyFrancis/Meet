import { LOAD_NOTIFICATIONS, CLEAR_NOTIFICATIONS_STATE } from '../constants/notificationConstants'

const initialState = {
  notifications: [],
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_NOTIFICATIONS:
      return { ...state, notifications: action.payload }
    case CLEAR_NOTIFICATIONS_STATE:
      return initialState
    default:
      return state
  }
}

export default notificationReducer
