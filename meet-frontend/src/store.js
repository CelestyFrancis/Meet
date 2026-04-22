import { configureStore } from '@reduxjs/toolkit'

import authReducer from './reducers/authReducers'
import postReducer from './reducers/postReducers'
import friendReducer from './reducers/friendReducers'
import notificationReducer from './reducers/notificationReducers'

const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    friend: friendReducer,
    notification: notificationReducer,
  }
})

export default store
