import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import LoginForm from './view/Login/LoginForm'
import RegisterForm from './view/Register/RegisterForm'
import Profile from './view/Profile/Profile'
import Dashboard from './view/Dashboard/Dashboard'
import App from './App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginForm />
  },
  {
    path: 'register',
    element: <RegisterForm />
  },
  {
    element: <App />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      {
        path: 'profile',
        element: <Profile />
      }
    ]
  }
])

export default router
