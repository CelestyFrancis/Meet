import React, { useEffect, useState } from 'react'
import Header from '../Header/Header'
import PostList from '../PostList/PostList'
import SideBar from '../SideBar/SideBar'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const [user, setUser] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/login')
    }
    setUser(localStorage.getItem('user'))
  }, [])

  return (
    <div className='dashboard'>
      <Header user={user} />
      <SideBar />
      <PostList />
    </div>
  )
}

export default Dashboard
