import './index.css'
import React, { useEffect } from 'react'
import blogsService from './services/blogs'

import LoginForm from './components/LoginForm'
import Users from './components/Users'
import User from './components/User'
import Navbar from './components/Navbar'
import BlogList from './components/BlogList'
import BlogInfo from './components/BlogInfo'
import Footer from './components/Footer'

import { connect } from 'react-redux'

import { initializeBlogs, addLike, removeBlog } from './reducers/blogsReducer'
import { initUser, removeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/creatorsReducer'

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

const App = props => {
  /* SIDE-EFFECTS */
  useEffect(() => {
    props.initializeBlogs()
    props.initUser()
    props.initializeUsers()
  }, [])

  const handleLogout = () => {
    blogsService.setToken(null)
    window.localStorage.removeItem('loggedBloglistUser')
    props.removeUser()
  }

  // matches for parametrized routes
  const userById = id => props.users.find(user => user.id === id)
  const blogById = id => props.blogs.find(blog => blog.id === id)

  return (
    <>
      <Router>
        {/* always displayed */}
        {props.user && <Navbar logout={handleLogout} />}
        {/* home renders either login or bloglist (if logged in) */}
        <Route
          exact
          path="/"
          render={() => (props.user ? <BlogList /> : <LoginForm />)}
        />
        <Route exact path="/users" render={() => <Users />} />
        <Route exact path="/login" render={() => <LoginForm />} />
        <Route exact path="/blogs" render={() => <Redirect to="/" />} />

        <Route
          exact
          path="/users/:id"
          render={({ match }) => {
            const userMatch = userById(match.params.id)
            if (!userMatch) {
              return <Redirect to="/users" />
            }
            return <User user={userMatch} />
          }}
        />

        <Route
          exact
          path="/blogs/:id"
          render={({ match }) => {
            const blogMatch = blogById(match.params.id)
            if (!blogMatch) {
              return <Redirect to="/blogs" />
            }
            return <BlogInfo match={blogMatch} />
          }}
        />
      </Router>
      <Footer />
    </>
  )
}

/* REDUX MAPPINGS*/

const mapDispatchToProps = {
  // pass action creators to component as props
  initializeBlogs,
  addLike,
  removeBlog,
  initUser,
  removeUser,
  initializeUsers,
}

const mapStateToProps = state => {
  // get state from redux store and pass to component
  return {
    blogs: state.blogs,
    user: state.user,
    users: state.users,
  }
}

// inject state and action creators
// into component
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
