import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import LoginForm from './components/Login/LoginForm'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </Router>
  )
}

export default App
