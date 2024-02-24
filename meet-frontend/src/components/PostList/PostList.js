import React, { useEffect } from 'react'
import './PostList.css'
import NewPost from '../Post/NewPost'
import { useSelector } from 'react-redux'
import { getPost } from '../../actions/postActions'
import { useDispatch } from 'react-redux'

const PostList = () => {
  const dispatch = useDispatch()

  const post = useSelector(state => state.post)
  const posts = post.postList
  useEffect(() => {
    dispatch(getPost())
  }, [])

  return (
    <div className='posts'>
      <NewPost />
      {posts &&
        posts.map(post => (
          <div key={post[0]} className='post'>
            <div className='section'>
              <h1>{post[2]} </h1>
              <p>{post[3]}</p>
              <p className='readmore'>{post[1]}</p>
            </div>
          </div>
        ))}
    </div>
  )
}

export default PostList
