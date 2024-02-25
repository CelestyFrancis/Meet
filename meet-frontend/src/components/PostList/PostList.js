import React from 'react'
import PropTypes from 'prop-types'

import './PostList.css'

const PostList = props => {
  const { posts } = props

  return (
    <div className='posts'>
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

PostList.propTypes = {
  posts: PropTypes.any
}

export default PostList
