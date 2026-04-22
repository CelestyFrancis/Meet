import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import PostList from '../../components/PostList/PostList'
import NewPost from '../../components/Post/NewPost'
import { getAllPost } from '../../actions/postActions'
import { loadFriends } from '../../actions/friendActions'
import './Dashboard.css'

const Dashboard = () => {
  const dispatch = useDispatch()
  const posts = useSelector(state => state.post.postList)
  const currentUserId = parseInt(localStorage.getItem('userId'))

  const refresh = () => dispatch(getAllPost())

  useEffect(() => {
    dispatch(getAllPost())
    dispatch(loadFriends())
  }, [dispatch])

  return (
    <div className='dashboard'>
      <NewPost onCreated={refresh} />
      <PostList posts={posts} currentUserId={currentUserId} onModified={refresh} />
    </div>
  )
}

export default Dashboard
