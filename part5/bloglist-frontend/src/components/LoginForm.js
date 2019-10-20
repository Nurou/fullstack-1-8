import { useField } from '../hooks/index'
import loginService from '../services/login'
import blogsService from '../services/blogs'
import Notification from '../components/Notification'
import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { addNotification } from '../reducers/notificationReducer'
import { flagError, clearError } from '../reducers/errorReducer'

const LoginForm = ({
  setUser,
  addNotification,
  flagError,
  clearError,
  error,
}) => {
  const username = useField('text', 'username')
  const password = useField('password', 'password')

  const handleSubmit = async event => {
    const resetForm = () => {
      username.reset()
      password.reset()
    }

    try {
      event.preventDefault()
      const user = await loginService.login({
        username: username.value,
        password: password.value,
      })

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogsService.setToken(user.token)
      setUser(user)
      resetForm()
      error && clearError()
    } catch (exception) {
      flagError()
      addNotification(`Invalid username or password!`, 2)
    }
  }

  return (
    <div>
      <h2>Login to the Application</h2>
      <Notification error={error} />
      <form onSubmit={handleSubmit}>
        <div>
          <input {...username.excludeReset} />
          <input {...password.excludeReset} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  addNotification: PropTypes.func.isRequired,
}

const mapStateToProps = state => {
  // retrieving the state of the notification
  // from store and returning a prop that holds it
  return {
    notification: state.notification,
    error: state.error,
  }
}

const mapDispatchToProps = {
  addNotification,
  flagError,
  clearError,
}

// export default LoginForm
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm)
