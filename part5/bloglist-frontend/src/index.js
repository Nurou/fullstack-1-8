import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'

import { createGlobalStyle } from 'styled-components'
const GlobalStyles = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Roboto');
    font-family: 'Roboto', sans-serif;
    font-size: 1.5em;
    background-color: #c2c7c1;



    /* Adapt the colors based on primary prop */
    button {
      // background: ${props => (props.primary ? 'black' : 'white')};
      background: #737572;
      color: ${props => (props.primary ? 'white' : '#102605')};
  
      font-size: 1em;
      margin: 1em;
      padding: 0.25em 1em;
      border: 2px solid grey;
      border-radius: 5px;
    }

    strong {
      font-weight: bold;
    }

  }
`

const render = () =>
  ReactDOM.render(
    <Provider store={store}>
      <GlobalStyles />
      <App />
    </Provider>,
    document.getElementById('root'),
  )

// console.log(store.getState())

render()
// whenever state changes, render (listener) will be called
// in effect, the app re-renders with each state update
store.subscribe(render)
