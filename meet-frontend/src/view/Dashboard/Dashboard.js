import React, { useEffect } from 'react'

import PostList from '../../components/PostList/PostList'
import NewPost from '../../components/Post/NewPost'
import './Dashboard.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPost } from '../../actions/postActions'

const Dashboard = () => {
  const dispatch = useDispatch()

  const post = useSelector(state => state.post)
  const posts = post.postList

  useEffect(() => {
    dispatch(getAllPost())
  }, [])

  return (
    <div className='dashboard'>
      <NewPost />
      <PostList posts={posts} />
    </div>
  )
}

export default Dashboard
