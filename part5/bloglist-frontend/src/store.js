/**
|--------------------------------------------------
| Initialise store and apply thunk here
|--------------------------------------------------
*/

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
// import notificationReducer from './reducers/notificationReducer'

// const reducer = combineReducers({
//   //   anecdotes: anecdoteReducer,
//   notification: notificationReducer,
//   //   filter: filterReducer,
// })

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

// const reducer = notificationReducer

const store = createStore(reducer)
// const store = createStore(
//   reducer, //
//   applyMiddleware(thunk),
// )

export default store
