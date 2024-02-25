import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import SideBar from './components/SideBar/SideBar'
import Header from './components/Header/Header'
import './App.css'

const App = () => {
  const [user, setUser] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/')
    } else {
      setUser(localStorage.getItem('user'))
    }
  }, [])

  return (
    <div className='app'>
      <Header user={user} />
      <SideBar />
      <Outlet />
    </div>
  )
}

export default App
