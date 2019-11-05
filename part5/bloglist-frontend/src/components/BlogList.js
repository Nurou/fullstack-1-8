import React from 'react'
import { connect } from 'react-redux'
import { addLike, removeBlog } from '../reducers/blogsReducer'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

const StyledLink = styled(Link)`
  text-decoration: none;

  &:hover {
    transform: translateY(-10px);
  }

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
  display: list-item;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: black;

  background: url(https://andyhooke.co.uk/wp-content/uploads/2018/02/yellow-brushstroke.png);
  background-repeat: no-repeat;
  background-size: 100% 95%;
  padding: 8px 0;
`

const StyledList = styled.ul`
  list-style-type: none;
  margin: 10px;
  padding: 15px;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(19rem, 1fr));
  grid-gap: 1rem;
`

const BlogList = props => {
  // references
  // const blogRef = React.createRef()
  const blogFormRef = React.createRef()

  // map each one to a component
  return (
    <>
      <h2>Blogs</h2>
      {/* blog addition form can be toggled */}
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm blogs={props.blogs} />
      </Togglable>
      <StyledList>
        {props.blogs.map(blog => (
          <li key={blog.id}>
            <StyledLink data-cy="post" to={`/blogs/${blog.id}`}>
              "{blog.title}" by <em>{blog.author}</em>
            </StyledLink>
          </li>
        ))}
      </StyledList>
    </>
  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    users: state.users,
  }
}

const mapDispatchToProps = {
  // pass action creators to component as props
  addLike,
  removeBlog,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlogList)
