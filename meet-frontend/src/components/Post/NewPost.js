import React, { useEffect, useState } from 'react'
import './Post.css'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, getPost } from '../../actions/postActions'

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
      dispatch(getPost())
    }
  }, [post.postCreated])

  return (
    <div className='newPost'>
      <div className='input-field'>
        <div className='button-wrap'>
          <h1>Create</h1>

          <button className='button' onClick={handleSubmit}>
            POST
          </button>
        </div>
        <label>
          Title
          <input
            type='text'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </label>
        <label>
          What is on your mind????
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            rows='5'
            cols='50'
          />
        </label>
      </div>
    </div>
  )
}

export default NewPost
