import React, { useState, useEffect } from 'react'
import './index.css'
import blogsService from './services/blogs'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { connect } from 'react-redux'

import { initializeBlogs, addLike, removeBlog } from './reducers/blogsReducer'

const App = props => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  // load up notes
  useEffect(() => {
    props.initializeBlogs()
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
    const blog = props.blogs.find(blog => blog.id === id)

    // create an updated copy
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }

    // update state/UI
    props.addLike(id, updatedBlog)
  }

  const handlePostRemoval = async id => {
    // get blog to be removed
    const blogToRemove = props.blogs.find(blog => blog.id === id)

    // prompt
    const isConfirmed = window.confirm(
      `Remove blog ${blogToRemove.title} by ${blogToRemove.author} ?`,
    )

    if (isConfirmed) {
      props.removeBlog(id)
    }
  }

  const listBlogs = () => {
    // blog with most likes on top
    // map each one to a component
    return props.blogs.map(blog => (
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

  const capitalizeFirsts = text => {
    return text
      .toLowerCase()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ')
  }

  const displayLoggedInInfo = () => (
    <>
      <h2>Blogs</h2>
      {capitalizeFirsts(user.name)} is currently logged in
      <div>
        <br />
        <button type="submit" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm blogs={blogs} updateBlogs={setBlogs} />
      </Togglable>
      <br />
      {listBlogs()}
    </>
  )

  const displayLogin = () => (
    <LoginForm setUser={setUser} setError={setErrorMessage} />
  )

  return <>{user ? displayLoggedInInfo() : displayLogin()}</>
}

/* REDUX MAPPINGS*/

const mapDispatchToProps = {
  // pass action creators to component as props
  initializeBlogs,
  addLike,
  removeBlog,
}

const mapStateToProps = state => {
  // get state from redux store and pass to component
  return {
    blogs: state.blogs,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
