/**
|--------------------------------------------------
| Initialise store and apply thunk here
|--------------------------------------------------
*/

import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import errorReducer from './reducers/errorReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  error: errorReducer,
})

// defines UI
const store = createStore(
  reducer, //
  composeWithDevTools(applyMiddleware(thunk)),
)

export default store
