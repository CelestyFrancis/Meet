import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PostList from '../../components/PostList/PostList'
import { getUserPosts } from '../../actions/postActions'
import UserImage from '../../assets/user.png'
import './Profile.css'

const Profile = () => {
  const [user, setUser] = useState('')
  const dispatch = useDispatch()
  const post = useSelector(state => state.post)
  const posts = post.userPost
  useEffect(() => {
    dispatch(getUserPosts())
    let username = localStorage.getItem('user')
    setUser(username)
  }, [])

  return (
    <div className='profile'>
      <div className='profile-wrap'>
        <div className='profile-header'>
          <i className='bx bxs-user'></i>
          <p>Profile</p>
        </div>
        <div className='profile-info'>
          <div className='photo'>
            {' '}
            <img src={UserImage} width='110vh' />
          </div>
          <div className='html about-me'>
            <h4>{user}</h4>
            <p>
              Hi, Its me {user}. Im a web and graphics designer. Designing is my
              passion and I have been working on various designing projects.
            </p>
          </div>
        </div>
        <div className='profile-header'>
          <i className='bx bxs-conversation'></i>
          <p>My Posts</p>
        </div>
        <PostList posts={posts} />
      </div>
    </div>
  )
}
export default Profile
