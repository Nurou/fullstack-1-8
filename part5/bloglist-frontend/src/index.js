import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, applyMiddleware } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

// defines UI
const store = createStore(notificationReducer, applyMiddleware(thunk))

// const render = () => ReactDOM.render(<App />, document.getElementById('root'))
const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  )

console.log(store.getState())

render()
// whenever state changes, render (listener) will be called
// in effect, the app re-renders with each state update
store.subscribe(render)
