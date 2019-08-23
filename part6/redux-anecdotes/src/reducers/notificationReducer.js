const reducer = (state = null, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.notification

    default:
      return state
  }
}

export const addNotification = notification => {
  return {
    type: 'NEW_NOTIFICATION',
    notification,
  }
}

export default reducer
