import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'

const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  )

render()
// whenever state changes, render (listener) will be called
// in effect, the app re-renders with each state update
store.subscribe(render)

/**
|--------------------------------------------------
| Task: 
Modify the initialization of redux-store to happen using
 asynchronous action creators, which are made possible by the redux-thunk-library.
|--------------------------------------------------
*/
