import React from 'react'

const Notification = ({ message, error }) => {
  return message ? (
    <div className={error ? 'error' : 'success'}>{message}</div>
  ) : null
}

export default Notification
