const reducer = (state = null, action) => {
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
