import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
  case 'ADD_NOTIFICATION':
    return action.payload
  case 'REMOVE_NOTIFICATION':
    return null
  default:
    return state
  }
}

const NotificationContext = createContext()

export const useNotificationMessage = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch.notifications
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch.dispatch
}

export const NotificationProvider = (props) => {
  const [notifications, dispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={{ notifications, dispatch }}>
      {props.children}
    </NotificationContext.Provider>
  )
}