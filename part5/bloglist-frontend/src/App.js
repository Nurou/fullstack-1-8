import React, { useState, useEffect } from 'react'
import './index.css'
import blogsService from './services/blogs'
import Blog from './components/Blog'
import FormikLogin from './components/FormikLogin'
import FormikAddBlog from './components/FormikAddBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

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

  // references
  const blogRef = React.createRef()
  const blogFormRef = React.createRef()

  const handleLikeUpdate = async id => {
    // get the blog with incremented likes
    const blog = blogs.find(blog => blog.id === id)

    // create an updated copy
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }

    const returnedBlog = await blogsService.update(id, updatedBlog)
    setBlogs(blogs.map(blog => (blog.id === id ? returnedBlog : blog)))
  }

  const handlePostRemoval = async id => {
    // get blog to be removed
    const blogToRemove = blogs.find(blog => blog.id === id)

    // prompt
    const isConfirmed = window.confirm(
      `Remove blog ${blogToRemove.title} by ${blogToRemove.author} ?`,
    )

    if (isConfirmed) {
      await blogsService.remove(id)
      // update UI
      setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id))
    }
  }

  const listBlogs = () => {
    // blog with most likes on top
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

    return sortedBlogs.map(blog => (
      <Blog
        key={blog.id}
        blog={blog}
        ref={blogRef}
        addLike={() => handleLikeUpdate(blog.id)}
        removePost={() => handlePostRemoval(blog.id)}
        user={user}
      />
    ))
  }

  const displayLoggedInInfo = () => (
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
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <FormikAddBlog
          blogs={blogs}
          updateBlogs={setBlogs}
          message={message}
          updateMessage={setMessage}
        />
      </Togglable>
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

  return <>{user ? displayLoggedInInfo() : displayLogin()}</>
}

export default App
