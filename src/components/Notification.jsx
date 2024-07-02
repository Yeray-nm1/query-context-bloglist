import { useNotificationMessage } from '../context/NotificationContext'

const Notification = () => {
  const notification = useNotificationMessage()
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const successStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (notification === null) {
    return null
  }

  return (
    <div style={notification.includes('Wrong') || notification.includes('Failed') ? errorStyle : successStyle}
      data-testid={notification.includes('Wrong') || notification.includes('Failed') ? 'error-message' : 'success-message'} >
      {notification}
    </div>
  )
}

export default Notification
