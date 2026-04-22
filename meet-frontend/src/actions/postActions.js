import postService from '../services/postServices'
import * as actionTypes from '../constants/postConstants'
import { loadNotifications } from './notificationActions'

export const createPost = post => async dispatch => {
  try {
    await postService.createPost(post)
    dispatch({ type: actionTypes.CREATE_POST_SUCCESS })
    dispatch(loadNotifications())
  } catch (error) {
    dispatch({ type: actionTypes.CREATE_POST_FAILURE, payload: error.message })
  }
}

export const getAllPost = () => async dispatch => {
  try {
    const data = await postService.getAllPosts()
    dispatch({ type: actionTypes.GET_POST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: actionTypes.GET_POST_FAILURE, payload: error.message })
  }
}

export const getUserPosts = authorId => async dispatch => {
  try {
    const data = await postService.getUserPosts(authorId)
    dispatch({ type: actionTypes.GET_USER_POST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: actionTypes.GET_POST_FAILURE, payload: error.message })
  }
}

export const editPost = (id, updates) => async dispatch => {
  try {
    await postService.editPost(id, updates)
    dispatch({ type: actionTypes.EDIT_POST_SUCCESS })
  } catch (error) {
    dispatch({ type: actionTypes.GET_POST_FAILURE, payload: error.message })
  }
}

export const deletePost = id => async dispatch => {
  try {
    await postService.deletePost(id)
    dispatch({ type: actionTypes.DELETE_POST_SUCCESS })
  } catch (error) {
    dispatch({ type: actionTypes.GET_POST_FAILURE, payload: error.message })
  }
}
