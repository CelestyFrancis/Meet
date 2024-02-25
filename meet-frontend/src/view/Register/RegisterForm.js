import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../actions/authActions'
import { useNavigate } from 'react-router-dom'

import '../Login/LoginForm.css'

const RegisterForm = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  const handleRegister = () => {
    const userData = { email, password, name }
    dispatch(registerUser(userData))
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
        <div className='content'>
          <div className='input-field'>
            <input
              type='text'
              placeholder='Name'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className='input-field'>
            <input
              type='email'
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
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  )
}

export default RegisterForm
