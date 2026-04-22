import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { createPost } from '../../actions/postActions'
import './Post.css'

const NewPost = ({ onCreated }) => {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return
    const authorId = parseInt(localStorage.getItem('userId'))
    const authorName = localStorage.getItem('user')
    dispatch(createPost({ title, content, authorId, authorName }))
    setTitle('')
    setContent('')
    if (onCreated) onCreated()
  }

  return (
    <div className='newPost'>
      <div className='input-field'>
        <div className='button-wrap'>
          <h2>Timeline</h2>
          <button className='button' onClick={handleSubmit}>POST</button>
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
            placeholder='What is on your mind?'
          />
        </label>
      </div>
    </div>
  )
}

NewPost.propTypes = {
  onCreated: PropTypes.func,
}

export default NewPost
