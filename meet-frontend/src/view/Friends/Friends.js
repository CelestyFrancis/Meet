import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import users from '../../data/users'
import {
  loadFriends,
  sendFriendRequest,
  acceptFriendRequest,
  declineFriendRequest,
  unfriend,
} from '../../actions/friendActions'
import './Friends.css'

const Friends = () => {
  const dispatch = useDispatch()
  const { friends, sentRequests, receivedRequests } = useSelector(state => state.friend)
  const currentUserId = parseInt(localStorage.getItem('userId'))

  useEffect(() => {
    dispatch(loadFriends())
  }, [dispatch])

  const friendIds = friends.map(f => f.id)
  const sentIds = sentRequests.map(f => f.id)
  const receivedIds = receivedRequests.map(f => f.id)

  const suggestions = users.filter(
    u => u.id !== currentUserId &&
      !friendIds.includes(u.id) &&
      !sentIds.includes(u.id) &&
      !receivedIds.includes(u.id)
  )

  return (
    <div className='friends-page'>
    <div className='friends-content'>

      {receivedRequests.length > 0 && (
        <section className='friends-section'>
          <h3>Friend Requests ({receivedRequests.length})</h3>
          {receivedRequests.map(u => (
            <div key={u.id} className='friend-card'>
              <i className='bx bxs-user friend-avatar'></i>
              <span className='friend-name'>{u.username}</span>
              <div className='friend-actions'>
                <button className='btn-accept' onClick={() => dispatch(acceptFriendRequest(u.id))}>Accept</button>
                <button className='btn-decline' onClick={() => dispatch(declineFriendRequest(u.id))}>Decline</button>
              </div>
            </div>
          ))}
        </section>
      )}

      <section className='friends-section'>
        <h3>My Friends {friends.length > 0 && `(${friends.length})`}</h3>
        {friends.length === 0 ? (
          <p className='empty-msg'>No friends yet — add someone below.</p>
        ) : (
          friends.map(u => (
            <div key={u.id} className='friend-card'>
              <i className='bx bxs-user friend-avatar'></i>
              <span className='friend-name'>{u.username}</span>
              <button className='btn-unfriend' onClick={() => dispatch(unfriend(u.id))}>Unfriend</button>
            </div>
          ))
        )}
      </section>

      {suggestions.length > 0 && (
        <section className='friends-section'>
          <h3>Find People</h3>
          {suggestions.map(u => (
            <div key={u.id} className='friend-card'>
              <i className='bx bxs-user friend-avatar'></i>
              <span className='friend-name'>{u.username}</span>
              <button className='btn-add' onClick={() => dispatch(sendFriendRequest(u.id))}>
                <i className='bx bx-user-plus'></i> Add Friend
              </button>
            </div>
          ))}
        </section>
      )}

      {sentRequests.length > 0 && (
        <section className='friends-section'>
          <h3>Sent Requests</h3>
          {sentRequests.map(u => (
            <div key={u.id} className='friend-card'>
              <i className='bx bxs-user friend-avatar'></i>
              <span className='friend-name'>{u.username}</span>
              <span className='tag-pending'>Pending</span>
            </div>
          ))}
        </section>
      )}

    </div>
    </div>
  )
}

export default Friends
