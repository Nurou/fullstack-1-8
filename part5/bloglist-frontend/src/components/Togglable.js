import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  /* css attributes passed to control display */
  const hideWhenVisible = {
    display: visible ? 'none' : '',
  }
  const showWhenVisible = {
    display: visible ? '' : 'none',
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // enable visibility to be toggled externally
  useImperativeHandle(ref, () => toggleVisibility)

  return (
    <>
      {/* when component's hidden, button provides option to show it*/}
      <div style={hideWhenVisible}>
        <button name="button" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      {/* show the component and a cancel option that hides it again */}
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
