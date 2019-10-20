import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'

const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  )

// console.log(store.getState())

render()
// whenever state changes, render (listener) will be called
// in effect, the app re-renders with each state update
store.subscribe(render)
