import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

/**
 * A styled navigation bar.
 */
const StyledNav = styled.div`
  background-color: #9ea3a0;
  height: 3rem;
  display: Flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 15px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 7px 7px 2px 1px #858285;

  a {
    padding: 15px;
    font-size: 1.3rem;
    text-decoration: none;
    color: #191a1a;
    font-weight: bold;
    background: inherit;
  }

  a:hover {
    text-decoration: none;
    color: white;
    background: inherit;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
  }

  li {
    float: left;
  }

  li a {
    display: block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
  }

  .active {
    background-color: #4caf50;
  }

  li a:hover {
    background-color: #111;
  }
`

const Navbar = props => {
  const padding = { padding: 5 }

  const capitalizeFirsts = text => {
    return text
      .toLowerCase()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ')
  }

  return (
    <StyledNav>
      <div>
        <Link style={padding} to="/blogs">
          Blogs
        </Link>
        <Link style={padding} to="/users">
          Users
        </Link>
        - <strong>{capitalizeFirsts(props.user.name)}</strong> logged in{' '}
        <button type="submit" onClick={props.handleLogout}>
          Logout
        </button>
      </div>{' '}
    </StyledNav>
  )
}

const mapStateToProps = state => {
  // get state from redux store and pass to component
  return {
    blogs: state.blogs,
    user: state.user,
  }
}

export default connect(
  mapStateToProps,
  null,
)(Navbar)