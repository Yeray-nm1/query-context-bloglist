import Login from './components/Login'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import { useUserCredentials, useUserDispatch } from './context/UserContext'
import { useEffect } from 'react'

const App = () => {
  const user = useUserCredentials()
  const dispatch = useUserDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      dispatch({ type: 'LOGIN', payload: JSON.parse(loggedUserJSON) })
    }
  }, [])

  return (
    <div>
      <Notification />
      {user === null
        ? <Login />
        : <Blogs user={user} />
      }
    </div>
  )
}

export default App
