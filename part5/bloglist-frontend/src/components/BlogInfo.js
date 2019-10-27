import React from 'react'
import { connect } from 'react-redux'
import { addLike, removeBlog } from '../reducers/blogsReducer'

const BlogInfo = ({ match, removeBlog, user, addLike }) => {
  const handlePostRemoval = async () => {
    // prompt
    const isConfirmed = window.confirm(
      `Remove blog ${match.title} by ${match.author} ?`,
    )

    if (isConfirmed) {
      removeBlog(match.id)
    }
  }

  return (
    <div>
      <h1>
        {match.title} by <em>{match.author}</em>
      </h1>

      <div>
        <div>
          <br />
          <a href={match.url} target="_blank">
            Read Post
          </a>
          <br />
          Popularity: {match.likes} likes{' '}
          <button onClick={() => addLike(match)}>Like</button>
          <br /> {/*  */}
          Post added here by: {match.user.name}
          <br />
          {match.user && user.name === match.user.name && (
            <button onClick={handlePostRemoval}>Remove</button>
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
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
)(BlogInfo)
