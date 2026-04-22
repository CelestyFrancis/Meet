import friendStorage from '../data/friendStorage'
import { LOAD_FRIENDS } from '../constants/friendConstants'
import { loadNotifications } from './notificationActions'

const currentUserId = () => parseInt(localStorage.getItem('userId'))

export const loadFriends = () => dispatch => {
  const data = friendStorage.getFriendData(currentUserId())
  dispatch({ type: LOAD_FRIENDS, payload: data })
}

export const sendFriendRequest = toId => dispatch => {
  friendStorage.sendRequest(currentUserId(), toId)
  dispatch(loadFriends())
  dispatch(loadNotifications())
}

export const acceptFriendRequest = fromId => dispatch => {
  friendStorage.acceptRequest(currentUserId(), fromId)
  dispatch(loadFriends())
  dispatch(loadNotifications())
}

export const declineFriendRequest = fromId => dispatch => {
  friendStorage.declineRequest(currentUserId(), fromId)
  dispatch(loadFriends())
  dispatch(loadNotifications())
}

export const unfriend = otherId => dispatch => {
  friendStorage.unfriend(currentUserId(), otherId)
  dispatch(loadFriends())
  dispatch(loadNotifications())
}
