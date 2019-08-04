/**
|--------------------------------------------------
| module for console logging
| prevents logging in test mode
|--------------------------------------------------
*/

// doesn't print in test mode
const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

// will print to console in test mode
const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info,
  error,
}
