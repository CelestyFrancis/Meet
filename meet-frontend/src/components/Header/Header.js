import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { logout } from '../../actions/authActions'
import Notifications from '../Notifications/Notifications'
import './Header.css'

const Header = props => {
  const { user } = props
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = e => {
    e.preventDefault()
    dispatch(logout())

    localStorage.removeItem('user')
    localStorage.removeItem('userId')

    navigate('/')
  }

  return (
    <div className='header'>
      <div className='text'>
        <h1>Simply the Best</h1>
      </div>
      <div className='log-out'>
        <p>hi {user}</p>
        <Notifications />
        <i className='bx bx-log-out ' onClick={e => handleLogout(e)}></i>
      </div>
    </div>
  )
}

Header.propTypes = {
  user: PropTypes.string
}

export default Header
