import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'

import { editPost, deletePost } from '../../actions/postActions'
import { sendFriendRequest } from '../../actions/friendActions'
import './PostList.css'

const PostList = ({ posts, currentUserId, onModified }) => {
  const dispatch = useDispatch()
  const { friends, sentRequests } = useSelector(state => state.friend)
  const friendIds = friends.map(f => f.id)
  const sentIds = sentRequests.map(f => f.id)

  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')

  const startEdit = post => {
    setEditingId(post.id)
    setEditTitle(post.title)
    setEditContent(post.content)
  }

  const cancelEdit = () => setEditingId(null)

  const saveEdit = id => {
    dispatch(editPost(id, { title: editTitle, content: editContent }))
    setEditingId(null)
    if (onModified) onModified()
  }

  const handleDelete = id => {
    if (!window.confirm('Delete this post?')) return
    dispatch(deletePost(id))
    if (onModified) onModified()
  }

  if (!posts || posts.length === 0) {
    return <p className='no-posts'>No posts yet.</p>
  }

  return (
    <div className='posts'>
      {posts.map(post => {
        const isOwn = currentUserId && post.authorId === currentUserId
        const isFriend = friendIds.includes(post.authorId)
        const isPending = sentIds.includes(post.authorId)
        const showAddFriend = !isOwn && !isFriend && currentUserId

        return (
          <div key={post.id} className='post'>
            {editingId === post.id ? (
              <div className='section'>
                <input
                  className='edit-input'
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                />
                <textarea
                  className='edit-textarea'
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                  rows='4'
                />
                <div className='post-actions'>
                  <button className='btn-save' onClick={() => saveEdit(post.id)}>Save</button>
                  <button className='btn-cancel' onClick={cancelEdit}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className='section'>
                <h1>{post.title}</h1>
                <p>{post.content}</p>
                <div className='post-footer'>
                  <p className='readmore'>{post.authorName}</p>
                  <div className='post-actions'>
                    {showAddFriend && (
                      isPending ? (
                        <span className='tag-requested'>Requested</span>
                      ) : (
                        <button className='btn-friend' onClick={() => dispatch(sendFriendRequest(post.authorId))}>
                          <i className='bx bx-user-plus'></i>
                        </button>
                      )
                    )}
                    {isOwn && (
                      <>
                        <button className='btn-icon' title='Edit' onClick={() => startEdit(post)}>
                          <i className='bx bx-edit'></i>
                        </button>
                        <button className='btn-icon btn-icon--danger' title='Delete' onClick={() => handleDelete(post.id)}>
                          <i className='bx bx-trash'></i>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

PostList.propTypes = {
  posts: PropTypes.array,
  currentUserId: PropTypes.number,
  onModified: PropTypes.func,
}

export default PostList
