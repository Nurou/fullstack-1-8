/* Make an asynchronous action creator, which enables one to provide the notification as follows:

props.setNotification(`you voted '${anecdote.content}'`, 10)
the first parameter is the text to be rendered
 and the second parameter is the time to display
 the notification given in seconds. */

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.notification
    case 'RESET':
      return null
    default:
      return state
  }
}

export const addNotification = (notification, seconds) => {
  const timeout = seconds * 1000

  return async dispatch => {
    await setTimeout(() => {
      dispatch({
        type: 'RESET',
      })
    }, timeout)

    dispatch({
      type: 'NEW_NOTIFICATION',
      notification,
    })
  }
}

export default reducer
