import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import LoginForm from './components/Login/LoginForm'
import Dashboard from './components/Dashboard/Dashboard'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </Router>
  )
}

export default App
