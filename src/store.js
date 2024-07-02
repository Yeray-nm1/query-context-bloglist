import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogReducer,
    notification: notificationReducer,
  },
})

export default store
