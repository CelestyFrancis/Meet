import { createBrowserRouter } from 'react-router-dom'

import LoginForm from './view/Login/LoginForm'
import Dashboard from './view/Dashboard/Dashboard'
import Profile from './view/Profile/Profile'
import Friends from './view/Friends/Friends'
import App from './App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginForm />,
  },
  {
    element: <App />,
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'profile', element: <Profile /> },
      { path: 'friends', element: <Friends /> },
    ],
  },
])

export default router
