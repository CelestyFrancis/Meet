import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PostList from '../../components/PostList/PostList'
import { getUserPosts } from '../../actions/postActions'
import UserImage from '../../assets/user.png'
import './Profile.css'

const Profile = () => {
  const [user, setUser] = useState('')
  const dispatch = useDispatch()
  const posts = useSelector(state => state.post.userPost)
  const currentUserId = parseInt(localStorage.getItem('userId'))

  const refresh = useCallback(() => dispatch(getUserPosts(currentUserId)), [dispatch, currentUserId])

  useEffect(() => {
    setUser(localStorage.getItem('user'))
    refresh()
  }, [refresh])

  return (
    <div className='profile'>
      <div className='profile-wrap'>
        <div className='profile-header'>
          <i className='bx bxs-user'></i>
          <p>Profile</p>
        </div>
        <div className='profile-info'>
          <div className='photo'>
            <img src={UserImage} width='110vh' alt='Profile' />
          </div>
          <div className='html about-me'>
            <h4>{user}</h4>
            <p>Hi, it&#39;s me {user}. Share your thoughts with the world.</p>
          </div>
        </div>
        <div className='profile-header'>
          <i className='bx bxs-conversation'></i>
          <p>My Posts</p>
        </div>
        <PostList posts={posts} currentUserId={currentUserId} onModified={refresh} />
      </div>
    </div>
  )
}

export default Profile
