import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ error, message }) => {
  return message ? (
    <div className={error ? 'error' : 'success'}>{message}</div>
  ) : null
}

const mapStateToProps = state => {
  return {
    // message stored in state
    message: state.notification,
    error: state.error,
  }
}

export default connect(mapStateToProps)(Notification)
