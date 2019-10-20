const reducer = (state = false, action) => {
  switch (action.type) {
    case 'ERROR':
      return true
    case 'CLEAR':
      return false
    default:
      return state
  }
}

export const flagError = () => {
  return {
    type: 'ERROR',
  }
}
export const clearError = () => {
  return {
    type: 'CLEAR',
  }
}

export default reducer
