const KEY = 'meet_notifications'

const getAll = () => {
  const data = localStorage.getItem(KEY)
  return data ? JSON.parse(data) : {}
}

const saveAll = data => localStorage.setItem(KEY, JSON.stringify(data))

const getUserNotifications = userId => {
  const all = getAll()
  return all[userId] || []
}

const saveUserNotifications = (userId, notifications) => {
  const all = getAll()
  all[userId] = notifications
  saveAll(all)
}

const addNotification = (userId, type, message) => {
  const notifications = getUserNotifications(userId)
  notifications.unshift({
    id: Date.now().toString(),
    type,
    message,
    read: false,
    createdAt: new Date().toISOString(),
  })
  saveUserNotifications(userId, notifications)
}

const markRead = (userId, notifId) => {
  const notifications = getUserNotifications(userId).map(n =>
    n.id === notifId ? { ...n, read: true } : n
  )
  saveUserNotifications(userId, notifications)
}

const markAllRead = userId => {
  const notifications = getUserNotifications(userId).map(n => ({ ...n, read: true }))
  saveUserNotifications(userId, notifications)
}

const clearAll = userId => saveUserNotifications(userId, [])

const notificationStorage = { getUserNotifications, addNotification, markRead, markAllRead, clearAll }

export default notificationStorage
