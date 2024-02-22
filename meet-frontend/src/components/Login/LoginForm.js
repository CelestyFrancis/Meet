// src/components/LoginForm.js
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../actions/authActions'
import './LoginForm.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  const handleLogin = () => {
    const userData = { username, password }
    dispatch(loginUser(userData))
  }

  return (
    <div className='login-form'>
      <h2>MEET</h2>
      {auth.error && <p style={{ color: 'red' }}>{auth.error}</p>}
      <div className='content'>
        <div className='input-field'>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className='input-field'>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default LoginForm
