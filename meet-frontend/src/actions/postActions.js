import postService from '../services/postServices'
import * as actionTypes from '../constants/postConstants'

export const createPost = post => async dispatch => {
  try {
    await postService.createPost(post)
    dispatch({ type: actionTypes.CREATE_POST_SUCCESS })
  } catch (error) {
    dispatch({ type: actionTypes.CREATE_POST_FAILURE, payload: error.message })
  }
}

export const getAllPost = () => async dispatch => {
  try {
    const posts = await postService.getAllPosts()
    dispatch({ type: actionTypes.GET_POST_SUCCESS, payload: posts })
  } catch (error) {
    dispatch({ type: actionTypes.GET_POST_FAILURE, payload: error.message })
  }
}

export const getUserPosts = () => async dispatch => {
  try {
    const posts = await postService.getUserPosts()
    dispatch({ type: actionTypes.GET_USER_POST_SUCCESS, payload: posts })
  } catch (error) {
    dispatch({ type: actionTypes.GET_POST_FAILURE, payload: error.message })
  }
}
