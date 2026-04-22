import * as post from '../constants/postConstants'

const initialState = {
  postList: [],
  postCreated: null,
  postModified: null,
  error: null,
  userPost: [],
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case post.CREATE_POST_SUCCESS:
      return { ...state, postCreated: true, error: null }

    case post.CREATE_POST_FAILURE:
      return { ...state, postCreated: false, error: action.payload }

    case post.GET_POST_SUCCESS:
      return { ...state, postCreated: null, postModified: null, postList: action.payload.posts, error: null }

    case post.GET_USER_POST_SUCCESS:
      return { ...state, postCreated: null, postModified: null, userPost: action.payload.posts, error: null }

    case post.EDIT_POST_SUCCESS:
    case post.DELETE_POST_SUCCESS:
      return { ...state, postModified: true, error: null }

    case post.GET_POST_FAILURE:
      return { ...state, postCreated: null, postModified: null, postList: [], userPost: [], error: action.payload }

    default:
      return state
  }
}

export default postReducer
