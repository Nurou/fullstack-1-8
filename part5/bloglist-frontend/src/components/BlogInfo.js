import React from 'react'
import { connect } from 'react-redux'
import { addLike, removeBlog } from '../reducers/blogsReducer'
import CommentForm from '../components/CommentForm'

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

  const displayComments = () => (
    <ul>
      {match.comments.map(comment => {
        return <li key={comment.id}>{comment.content}</li>
      })}
    </ul>
  )

  return (
    <div>
      <h1>
        {match.title} by <em>{match.author}</em>
      </h1>

      <div>
        <div>
          <br />
          <a href={match.url} target="_blank" rel="noopener noreferrer">
            Read Post
          </a>
          <br />
          Popularity: {match.likes} likes{' '}
          <button data-cy="btn-like" onClick={() => addLike(match)}>
            Like
          </button>
          <br /> {/*  */}
          Post added here by: {match.user.name}
          <br />
          {match.user && user.name === match.user.name && (
            <button data-cy="btn-remove" onClick={handlePostRemoval}>
              Remove
            </button>
          )}
        </div>
        <h2>Comments</h2>
        <CommentForm blog={match} />
        {match.comments && displayComments()}
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
    // blogs: state.blogs
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
