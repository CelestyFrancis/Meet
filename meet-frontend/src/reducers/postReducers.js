import * as post from '../constants/postConstants'

const initialState = {
  postList: null,
  postCreated: null,
  error: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case post.CREATE_POST_SUCCESS:
      return {
        ...state,
        postCreated: true,
        postList: state.postLists,
        error: null
      }

    case post.CREATE_POST_FAILURE:
      return {
        ...state,
        postCreated: false,
        postList: state.postList,
        error: action.payload
      }
    case post.GET_POST_SUCCESS:
      return {
        ...state,
        postCreated: null,
        postList: action.payload.posts,
        error: null
      }
    case post.GET_POST_FAILURE:
      return {
        ...state,
        postCreated: null,
        postList: null,
        error: action.payload
      }
    default:
      return state
  }
}

export default authReducer
