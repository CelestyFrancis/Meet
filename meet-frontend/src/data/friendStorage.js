import users from './users'
import notificationStorage from './notificationStorage'

const KEY = 'meet_friends'

const getAll = () => {
  const data = localStorage.getItem(KEY)
  return data ? JSON.parse(data) : {}
}

const saveAll = data => localStorage.setItem(KEY, JSON.stringify(data))

const getUserData = userId => {
  const all = getAll()
  return all[userId] || { friends: [], sentRequests: [], receivedRequests: [] }
}

const saveUserData = (userId, data) => {
  const all = getAll()
  all[userId] = data
  saveAll(all)
}

const byId = id => users.find(u => u.id === id)

const sendRequest = (fromId, toId) => {
  const from = getUserData(fromId)
  const to = getUserData(toId)
  if (from.friends.includes(toId) || from.sentRequests.includes(toId)) return
  from.sentRequests.push(toId)
  to.receivedRequests.push(fromId)
  saveUserData(fromId, from)
  saveUserData(toId, to)
  const senderName = byId(fromId)?.username || 'Someone'
  notificationStorage.addNotification(toId, 'friend_request', `${senderName} sent you a friend request`)
}

const acceptRequest = (userId, fromId) => {
  const userData = getUserData(userId)
  const fromData = getUserData(fromId)
  userData.receivedRequests = userData.receivedRequests.filter(id => id !== fromId)
  fromData.sentRequests = fromData.sentRequests.filter(id => id !== userId)
  userData.friends.push(fromId)
  fromData.friends.push(userId)
  saveUserData(userId, userData)
  saveUserData(fromId, fromData)
  const accepterName = byId(userId)?.username || 'Someone'
  notificationStorage.addNotification(fromId, 'friend_accepted', `${accepterName} accepted your friend request`)
}

const declineRequest = (userId, fromId) => {
  const userData = getUserData(userId)
  const fromData = getUserData(fromId)
  userData.receivedRequests = userData.receivedRequests.filter(id => id !== fromId)
  fromData.sentRequests = fromData.sentRequests.filter(id => id !== userId)
  saveUserData(userId, userData)
  saveUserData(fromId, fromData)
}

const unfriend = (userId, otherId) => {
  const userData = getUserData(userId)
  const otherData = getUserData(otherId)
  userData.friends = userData.friends.filter(id => id !== otherId)
  otherData.friends = otherData.friends.filter(id => id !== userId)
  saveUserData(userId, userData)
  saveUserData(otherId, otherData)
}

const getFriendData = userId => {
  const data = getUserData(userId)
  return {
    friends: data.friends.map(byId).filter(Boolean),
    sentRequests: data.sentRequests.map(byId).filter(Boolean),
    receivedRequests: data.receivedRequests.map(byId).filter(Boolean),
  }
}

const friendStorage = { sendRequest, acceptRequest, declineRequest, unfriend, getFriendData, getUserData }

export default friendStorage
