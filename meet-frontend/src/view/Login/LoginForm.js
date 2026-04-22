import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { loginUser } from '../../actions/authActions'
import Error from '../../components/Error/Error'
import users from '../../data/users'
import './LoginForm.css'

const LoginForm = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  const handleLogin = () => {
    dispatch(loginUser({ email, password }))
  }

  const fillCredentials = user => {
    setEmail(user.email)
    setPassword(user.password)
  }

  useEffect(() => {
    if (auth.isAuthenticated) {
      localStorage.setItem('user', auth.user)
      localStorage.setItem('userId', auth.userId)
      navigate('/dashboard')
    }
  }, [auth, navigate])

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
        <button onClick={handleLogin}>Login</button>
        <div className='demo-accounts'>
          <p className='demo-label'>Demo accounts — click to fill:</p>
          {users.map(u => (
            <button key={u.id} className='demo-btn' onClick={() => fillCredentials(u)}>
              {u.username}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoginForm
