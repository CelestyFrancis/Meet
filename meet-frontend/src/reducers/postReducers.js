import * as post from '../constants/postConstants'

const initialState = {
  postList: null,
  postCreated: null,
  error: null,
  userPost: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case post.CREATE_POST_SUCCESS:
      return {
        ...state,
        postCreated: true,
        postList: state.postLists,
        error: null,
        userPost: null
      }

    case post.CREATE_POST_FAILURE:
      return {
        ...state,
        postCreated: false,
        postList: state.postList,
        error: action.payload,
        userPost: null
      }
    case post.GET_POST_SUCCESS:
      return {
        ...state,
        postCreated: null,
        postList: action.payload.posts,
        error: null,
        userPost: state.userPost
      }
    case post.GET_USER_POST_SUCCESS:
      return {
        ...state,
        postCreated: null,
        postList: state.postList,
        error: null,
        userPost: action.payload.posts
      }

    case post.GET_POST_FAILURE:
      return {
        ...state,
        postCreated: null,
        postList: null,
        error: action.payload,
        userPost: null
      }
    default:
      return state
  }
}

export default authReducer
