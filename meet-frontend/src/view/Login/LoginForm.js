import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { loginUser } from '../../actions/authActions'
import Error from '../../components/Error/Error'
import './LoginForm.css'

const LoginForm = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  const handleLogin = () => {
    const userData = { email, password }
    dispatch(loginUser(userData))
  }

  useEffect(() => {
    if (auth.isAuthenticated) {
      localStorage.setItem('user', auth.user)
      localStorage.setItem('userId', auth.userId)
      sessionStorage.setItem('token', auth.token)

      navigate('/dashboard')
    }
  }, [auth])

  return (
    <div>
      <div className='login-form'>
        <h2>MEET</h2>
        {auth.error && <Error error={auth.error} />}
        <div className='content'>
          <div className='input-field'>
            <input
              type='text'
              placeholder='Email'
              value={email}
              onChange={e => setEmail(e.target.value)}
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
        <a href='/register'>Not a user? Register!</a>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  )
}

export default LoginForm
