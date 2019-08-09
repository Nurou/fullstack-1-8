import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import loginService from './services/login'
import blogsService from './services/blogs'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  // load up notes
  useEffect(() => {
    blogsService
      .getAll() //
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  // check for logged in user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      loginService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      // hit the login API
      const user = await loginService.login({ username, password })
      // store the token returned by server
      loginService.setToken(user.token)
      // save user to local storage
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      // update current user
      setUser(user)
      console.log(user)
      // clear fields
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Login to the Application</h2>
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
