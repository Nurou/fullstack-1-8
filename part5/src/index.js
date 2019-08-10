import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import './index.css'
import blogsService from './services/blogs'
import Blog from './components/Blog'
import FormikLogin from './components/FormikLogin'
import FormikAddBlog from './components/FormikAddBlog'
import Notification from './components/Notification'

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      blogsService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    blogsService.setToken(null)
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const listBlogs = () => {
    return blogs.map(blog => <Blog key={blog.id} blog={blog} />)
  }

  const displayUserInfo = () => (
    <>
      <h2>Blogs</h2>
      {user.name} logged in
      <div>
        <button type="submit" onClick={handleLogout}>
          logout
        </button>
      </div>
      <br />
      <Notification message={message} />
      <br />
      <FormikAddBlog
        blogs={blogs}
        setBlogs={setBlogs}
        message={message}
        setMessage={setMessage}
      />
      <br />
      {listBlogs()}
    </>
  )

  const displayLogin = () => (
    <>
      <h2>Login to the Application</h2>
      <Notification message={errorMessage} error="true" />
      <FormikLogin setUser={setUser} setErrorMessage={setErrorMessage} />
    </>
  )

  return <>{user ? displayUserInfo() : displayLogin()}</>
}

render(<App />, document.getElementById('root'))
