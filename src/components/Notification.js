import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification.message)
  const notificationStyle = useSelector(state => state.notification.style)
  if (notification === null) { return null }

  let notificationCss

  switch (notificationStyle) {
    case 'notification':
      notificationCss = {
        color: 'green',
        fontStyle: 'bold',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        borderColor: '#008000',
        backgroundColor: '#ebfaeb',
        padding: 8,
        margin: 5
      }
      break
    case 'error':
      notificationCss = {
        color: 'red',
        fontStyle: 'bold',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        borderColor: '#b30000',
        backgroundColor: '#ffcccc',
        padding: 8,
        margin: 5
      }
      break
    case null:
      notificationCss = null
      break
    default:
      notificationCss = null
      break
  }

  return (
    <div className={notificationStyle} style={notificationCss}>
      {notification}
    </div>
  )
}

//moved notification state from App to component but this seems hackier.
//maybe state should be held by App. it works so whatever
// const Notification = forwardRef((props, ref) => {
//   const [notificationMessage, setNotificationMessage] = useState(null)
//   const [notificationStyle, setNotificationStyle] = useState(null)

//   const createNotification = (message, style = 'notification', timeout = 6000) => {
//     //console.log('createNotification: message:', message, 'style:', style, 'timeout:', timeout, 'props:', props)
//     const clearNotification = () => {
//       if (notificationTimeoutId !== null) {
//         clearTimeout(notificationTimeoutId)
//       }

//       setNotificationMessage(null)
//       setNotificationStyle(null)
//     }

//     //calling with message === null clears notification
//     if (message === null) {
//       clearNotification()
//       return
//     }

//     //clear possible previous timeout so it doesn't set this new notification to null prematurely
//     if (notificationTimeoutId !== null) {
//       clearTimeout(notificationTimeoutId)
//     }

//     setNotificationMessage(message)
//     setNotificationStyle(style)

//     notificationTimeoutId = setTimeout(() => {
//       clearNotification()
//     }, timeout)
//   }

//   useImperativeHandle(ref, () => {
//     return {
//       createNotification
//     }
//   })

//   let notificationCss

//   switch (notificationStyle) {
//     case 'notification':
//       notificationCss = {
//         color: 'green',
//         fontStyle: 'bold',
//         fontSize: 20,
//         borderStyle: 'solid',
//         borderRadius: 5,
//         borderColor: '#008000',
//         backgroundColor: '#ebfaeb',
//         padding: 8,
//         margin: 5
//       }
//       break
//     case 'error':
//       notificationCss = {
//         color: 'red',
//         fontStyle: 'bold',
//         fontSize: 20,
//         borderStyle: 'solid',
//         borderRadius: 5,
//         borderColor: '#b30000',
//         backgroundColor: '#ffcccc',
//         padding: 8,
//         margin: 5
//       }
//       break
//     case null:
//       notificationCss = null
//       break
//     default:
//       notificationCss = null
//       break
//   }

//   return (
//     <div className={notificationStyle} style={notificationCss}>
//       {notificationMessage}
//     </div>
//   )
// })

export default Notification