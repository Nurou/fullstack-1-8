import React from 'react'
import { connect } from 'react-redux'

// const Notification = ({ message, error }) => {
//   return message ? (
//     <div className={error ? 'error' : 'success'}>{message}</div>
//   ) : null
// }
// TODO: clean up component's props
const Notification = ({ message, error, notif }) => {
  return notif ? (
    <div className={error ? 'error' : 'success'}>{notif}</div>
  ) : null
}

const mapStateToProps = state => {
  return {
    // message stored in state
    notif: state,
  }
}

export default connect(mapStateToProps)(Notification)
