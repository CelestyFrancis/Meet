import { LOAD_FRIENDS, CLEAR_FRIENDS } from '../constants/friendConstants'

const initialState = {
  friends: [],
  sentRequests: [],
  receivedRequests: [],
}

const friendReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_FRIENDS:
      return { ...state, ...action.payload }
    case CLEAR_FRIENDS:
      return initialState
    default:
      return state
  }
}

export default friendReducer
