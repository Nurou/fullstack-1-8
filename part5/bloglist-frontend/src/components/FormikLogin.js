import React from 'react'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import loginService from '../services/login'
import blogsService from '../services/blogs'
import * as Yup from 'yup'
import PropTypes from 'prop-types'
import { useField } from '../hooks/index'

const LoginForm = ({ isSubmitting }) => {
  return (
    <div>
      <h2>Login to the Application</h2>
      <Form>
        <div>
          <Field type="username" name="username" placeholder="username" />
          <ErrorMessage name="username" />
        </div>
        <div>
          <Field type="password" name="password" placeholder="password" />
          <ErrorMessage name="password" />
        </div>
        <button disabled={isSubmitting} type="submit">
          Login
        </button>
      </Form>
    </div>
  )
}

const FormikLogin = withFormik({
  mapPropsToValues({ username, password, setUser, setErrorMessage }) {
    return {
      username: username || '',
      password: password || '',
      setUser: setUser,
      setErrorMessage: setErrorMessage,
    }
  },
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .min(3, 'minimum 3 characters')
      .required('username is required'),
    password: Yup.string()
      .min(5, 'minimum 5 characters')
      .required('password is required'),
  }),
  async handleSubmit(
    { username, password, setUser, setErrorMessage },
    { setSubmitting },
  ) {
    try {
      // hit the login API
      const user = await loginService.login({ username, password })
      // store the token returned by server
      blogsService.setToken(user.token)
      // save user to local storage
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      // set logged in user as the user
      setUser(user)
      setSubmitting(false)
    } catch (exception) {
      console.log(exception)
      setErrorMessage('Wrong username or password!')
      setTimeout(() => {
        setErrorMessage(null)
        setSubmitting(false)
      }, 2000)
    }
  },
})(LoginForm)

FormikLogin.propTypes = {
  setUser: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
}

export default FormikLogin
