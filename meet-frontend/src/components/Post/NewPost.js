import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { createPost, getAllPost } from '../../actions/postActions'
import './Post.css'

const NewPost = () => {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')

  const auth = useSelector(state => state.auth)
  const post = useSelector(state => state.post)
  const dispatch = useDispatch()

  const handleSubmit = () => {
    const author = auth.userId
    const post = { content, title, author }
    dispatch(createPost(post))
    setTitle('')
    setContent('')
  }

  useEffect(() => {
    if (post.postCreated) {
      dispatch(getAllPost())
    }
  }, [post.postCreated])

  return (
    <div className='newPost'>
      <div className='input-field'>
        <div className='button-wrap'>
          <h2>Timeline</h2>

          <button className='button' onClick={handleSubmit}>
            POST
          </button>
        </div>
        <label>
          <input
            type='text'
            value={title}
            placeholder='Title'
            onChange={e => setTitle(e.target.value)}
          />
        </label>
        <label>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            rows='5'
            cols='50'
            placeholder='What is on your mind????'
          />
        </label>
      </div>
    </div>
  )
}

export default NewPost
