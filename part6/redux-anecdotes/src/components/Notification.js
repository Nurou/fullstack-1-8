import React from 'react'
import { connect } from 'react-redux'

const Notification = props => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    width: '50%',
    color: 'blue',
  }

  return <div style={style}>{props.message}</div>
}

// state (store) available to all of App's child components
const mapStateToProps = state => {
  return {
    // message stored in state
    message: state.notification,
  }
}

// mapStateToProps returns the notif from state
// which then gets injected into Notif component
// hence why it can access it through its props
export default connect(mapStateToProps)(Notification)
