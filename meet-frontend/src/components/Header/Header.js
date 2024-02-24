import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import './Header.css'

const Header = props => {
  const { user } = props
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.clear()
    sessionStorage.clear()

    navigate('/login')
  }

  return (
    <div className='header'>
      <div className='text'>
        <h1>Simply the Best</h1>
      </div>
      <div className='log-out'>
        <p>hi {user}</p>
        <i className='bx bx-log-out ' onClick={handleLogout}></i>
      </div>
    </div>
  )
}

Header.propTypes = {
  user: PropTypes.string
}

export default Header
