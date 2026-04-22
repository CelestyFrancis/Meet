import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  loadNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  clearNotifications,
} from '../../actions/notificationActions'
import './Notifications.css'

const TYPE_ICON = {
  friend_request: 'bx-user-plus',
  friend_accepted: 'bx-user-check',
  new_post: 'bx-news',
}

const Notifications = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const { notifications } = useSelector(state => state.notification)
  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    dispatch(loadNotifications())
  }, [])

  useEffect(() => {
    if (!open) return
    const close = () => setOpen(false)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [open])

  const handleBellClick = e => {
    e.stopPropagation()
    setOpen(prev => !prev)
  }

  const handleMarkRead = (e, id) => {
    e.stopPropagation()
    dispatch(markNotificationRead(id))
  }

  const handleMarkAllRead = e => {
    e.stopPropagation()
    dispatch(markAllNotificationsRead())
  }

  const handleClear = e => {
    e.stopPropagation()
    dispatch(clearNotifications())
    setOpen(false)
  }

  return (
    <div className='notif-wrap' onClick={e => e.stopPropagation()}>
      <div className='notif-bell' onClick={handleBellClick}>
        <i className='bx bx-bell'></i>
        {unreadCount > 0 && <span className='notif-badge'>{unreadCount}</span>}
      </div>

      {open && (
        <div className='notif-dropdown'>
          <div className='notif-header'>
            <span className='notif-title'>Notifications</span>
            <div className='notif-controls'>
              {notifications.some(n => !n.read) && (
                <button className='notif-btn' onClick={handleMarkAllRead}>Mark all read</button>
              )}
              {notifications.length > 0 && (
                <button className='notif-btn notif-btn-clear' onClick={handleClear}>Clear all</button>
              )}
            </div>
          </div>

          <div className='notif-list'>
            {notifications.length === 0 ? (
              <p className='notif-empty'>No notifications</p>
            ) : (
              notifications.map(n => (
                <div
                  key={n.id}
                  className={`notif-item ${n.read ? 'notif-read' : 'notif-unread'}`}
                  onClick={e => handleMarkRead(e, n.id)}
                >
                  <i className={`bx ${TYPE_ICON[n.type] || 'bx-bell'} notif-icon`}></i>
                  <div className='notif-body'>
                    <p className='notif-msg'>{n.message}</p>
                    <span className='notif-time'>
                      {new Date(n.createdAt).toLocaleString()}
                    </span>
                  </div>
                  {!n.read && <span className='notif-dot'></span>}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Notifications
