import { useUserDispatch } from '../context/UserContext'
import { useNotificationDispatch } from '../context/NotificationContext'
import loginService from '../services/login'
import { useState } from 'react'

const Login = () => {
  const userDispatch = useUserDispatch()
  const notificationDispatch = useNotificationDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      userDispatch({ type: 'LOGIN', payload: user })
      setUsername('')
      setPassword('')
      notificationDispatch({ type: 'ADD_NOTIFICATION', payload: `${user.username} logged!` })
      setTimeout(() => {
        notificationDispatch({ type: 'REMOVE_NOTIFICATION' })
      }, 3000)
    } catch (exception) {
      notificationDispatch({ type: 'ADD_NOTIFICATION', payload: 'Wrong credentials' })
      setTimeout(() => {
        notificationDispatch({ type: 'REMOVE_NOTIFICATION' })
      }, 3000)
    }
  }

  return (
    <div>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
