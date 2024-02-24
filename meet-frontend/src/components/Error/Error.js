import React from 'react'
import PropTypes from 'prop-types'
import './Error.css'

const Error = props => {
  const { error } = props

  return (
    <div className='error'>
      <p>{error}</p>
    </div>
  )
}
Error.propTypes = {
  error: PropTypes.string
}
export default Error
