import { useField } from '../hooks/index'
import loginService from '../services/login'
import blogsService from '../services/blogs'
import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ setUser, setError }) => {
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
    } catch (exception) {
      console.log(exception)
      setError('Invalid username or password!')
      setTimeout(() => {
        setError(null)
      }, 2000)
    }
  }

  return (
    <div>
      <h2>Login to the Application</h2>
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
  setUser: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
}

export default LoginForm
