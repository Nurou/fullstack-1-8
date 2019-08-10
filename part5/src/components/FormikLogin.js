import React from 'react'
import { withFormik, Form, Field } from 'formik'
import loginService from '../services/login'
import blogsService from '../services/blogs'
import * as Yup from 'yup'

const LoginForm = ({ errors, touched, isSubmitting }) => (
  <Form>
    <div>
      {/* {touched.username && errors.username && <p>{errors.username}</p>} */}
      <Field type="username" name="username" placeholder="username" />
    </div>
    <div>
      {/* {touched.password && errors.password && <p>{errors.password}</p>} */}
      <Field type="password" name="password" placeholder="password" />
    </div>
    <button disabled={isSubmitting} type="submit">
      Login
    </button>
  </Form>
)

const FormikLogin = withFormik({
  mapPropsToValues({ username, password, setUser, setErrorMessage }) {
    return {
      username: username || '',
      password: password || '',
      setUser: setUser,
      setErrorMessage: setErrorMessage,
    }
  },
  // validationSchema: Yup.object().shape({
  //   username: Yup.string()
  //     .min(5, 'minimum 5 characters')
  //     .required('username is required'),
  //   password: Yup.string()
  //     .min(5, 'minimum 5 characters')
  //     .required('password is required'),
  // }),
  async handleSubmit(
    { username, password, setUser, setErrorMessage },
    { setSubmitting, resetForm },
  ) {
    try {
      // hit the login API
      const user = await loginService.login({ username, password })
      // store the token returned by server
      blogsService.setToken(user.token)
      // save user to local storage
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      // update user
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

export default FormikLogin
