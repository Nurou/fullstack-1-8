import React from 'react'
import LoginForm from './LoginForm'

export const LoginView = props => {
  if (!props.show) {
    return null
  }
  return (
    <div className='flex justify-center'>
      <LoginForm
        login={props.login}
        setToken={props.setToken}
        setPage={props.setPage}
      />
    </div>
  )
}

export default LoginView
