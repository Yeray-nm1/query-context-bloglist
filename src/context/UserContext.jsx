import { useContext, createContext, useReducer } from 'react'
import blogService from '../services/blogs'

const UserContext = createContext()

export const useUserCredentials = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[0]
}

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[1]
}

const userReducer = (state, action) => {
  switch (action.type) {
  case 'LOGIN':
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(action.payload))
    blogService.setToken(action.payload.token)
    return action.payload
  case 'LOGOUT':
    window.localStorage.removeItem('loggedBlogappUser')
    return null
  default:
    return state
  }
}

export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null)

  return (
    <UserContext.Provider value={[user, dispatch]}>
      {children}
    </UserContext.Provider>
  )
}