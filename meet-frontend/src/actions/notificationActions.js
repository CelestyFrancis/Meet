import notificationStorage from '../data/notificationStorage'
import { LOAD_NOTIFICATIONS } from '../constants/notificationConstants'

const currentUserId = () => parseInt(localStorage.getItem('userId'))

export const loadNotifications = () => dispatch => {
  const notifications = notificationStorage.getUserNotifications(currentUserId())
  dispatch({ type: LOAD_NOTIFICATIONS, payload: notifications })
}

export const markNotificationRead = id => dispatch => {
  notificationStorage.markRead(currentUserId(), id)
  dispatch(loadNotifications())
}

export const markAllNotificationsRead = () => dispatch => {
  notificationStorage.markAllRead(currentUserId())
  dispatch(loadNotifications())
}

export const clearNotifications = () => dispatch => {
  notificationStorage.clearAll(currentUserId())
  dispatch(loadNotifications())
}
