import { useField } from '../hooks/index'
import Notification from '../components/Notification'
import React from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { addNotification } from '../reducers/notificationReducer'
import { flagError, clearError } from '../reducers/errorReducer'
import { logUserIn } from '../reducers/userReducer'

import styled from 'styled-components'

const StyledLoginForm = styled.div`
  * {
    box-sizing: border-box;
  }

  body {
    padding-top: 20%;
  }

  h1,
    width: 80%;
    margin: 0 auto;
  }

  @supports (display: flex) {
    body {
      padding: 0;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    h1,
    .login,
    .account,
    .contact {
      margin: 0;
      width: 80%;
    }
  }

  @supports (display: grid) {
    body {
      display: grid;
      grid-template-columns: 80%;
      align-content: center;
      align-items: stretch;
    }
    @media (min-width: 650px) {
      body {
        grid-template-columns: repeat(2, minmax(150px, 30%));
      }
      h1,
      .login {
        grid-column-end: span 2;
        width: auto;
      }
      .login > div {
        display: grid;
        grid-template-columns: 1fr 2fr;
        align-items: center;
      }
      .login > div.actions {
        grid-template-columns: 1fr 1fr 1fr;
      }
      .account {
        border-right: 1px dotted rgb(191, 216, 227);
        padding: 0 10px 0 0;
        align-self: end;
        width: auto;
      }
      .contact {
        padding: 0 0 0 10px;
        width: auto;
      }
      input[type='submit'] {
        grid-column: 2;
      }
      .actions a {
        justify-self: end;
      }
    }
  }

  h1 {
    background-color: rgba(191, 216, 227, 0.8);
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    padding: 10px;
    font-size: 24px;
    line-height: 1.4;
  }

  .login {
    background-color: rgba(191, 216, 227, 0.4);
    border: 1px solid rgba(191, 216, 227, 0.8);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
  }

  .login > div {
    padding: 5px 0;
  }

  input[type='submit'] {
    border: 1px solid rgba(191, 216, 227, 0.8);
    border-radius: 5px;
    color: #fff;
    background-color: rgb(54, 134, 169);
    font-size: 110%;
  }

  input[type='text'],
  input[type='password'] {
    border: 1px solid rgba(191, 216, 227, 0.8);
    padding: 5px;
    border-radius: 5px;
    font-size: 110%;
    width: 100%;
  }

  .actions a {
    font-size: 80%;
  }
`

const LoginForm = ({
  addNotification,
  flagError,
  clearError,
  error,
  logUserIn,
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
      logUserIn(username, password)
      resetForm()
      error && clearError()
    } catch (exception) {
      flagError()
      addNotification(`Invalid username or password!`, 2)
    }
  }

  return (
    <StyledLoginForm>
      <h2>Login to the Application</h2>
      <Notification error={error} />
      <form onSubmit={handleSubmit}>
        <div>
          <input {...username.excludeReset} />
          <input {...password.excludeReset} />
        </div>
        <button type="submit" data-cy="submit">
          Login
        </button>
      </form>
    </StyledLoginForm>
  )
}

LoginForm.propTypes = {
  addNotification: PropTypes.func.isRequired,
  flagError: PropTypes.func.isRequired,
  clearError: PropTypes.func.isRequired,
  logUserIn: PropTypes.func.isRequired,
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
  logUserIn,
}

// export default LoginForm
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm)
