import loginService from '../services/login'
import blogsService from '../services/blogs'

const reducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USER':
      return action.data.user
    case 'REMOVE_USER':
      return null
    case 'LOG':
      return action.data.user
    default:
      return state
  }
}

/* ACTION CREATORS */

export const initUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogsService.setToken(user.token)
      dispatch({
        type: 'INIT_USER',
        data: { user },
      })
    }
  }
}

export const removeUser = () => {
  return {
    type: 'REMOVE_USER',
  }
}

export const logUserIn = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({
      username: username.value,
      password: password.value,
    })

    window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
    blogsService.setToken(user.token)

    dispatch({
      type: 'LOG',
      data: { user },
    })
  }
}

export default reducer
