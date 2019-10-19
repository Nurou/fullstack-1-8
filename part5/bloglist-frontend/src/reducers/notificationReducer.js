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

/* ACTION CREATORS */
export const addNotification = (notification, seconds) => {
  const timeout = seconds * 2000

  // adds new notification, then resets state
  return async dispatch => {
    // this dispatched after timeout
    await setTimeout(() => {
      dispatch({
        type: 'RESET',
      })
    }, timeout)

    // this gets dispatched 1st
    dispatch({
      type: 'NEW_NOTIFICATION',
      notification,
    })
  }
}

export default reducer
