import { useField } from '../hooks/index'
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../reducers/blogsReducer'

const CommentForm = props => {
  // custom hook for fields
  const content = useField('text', 'add comment')

  const handleComment = async event => {
    const resetForm = () => {
      content.reset()
    }

    try {
      event.preventDefault()
      // add comment to the post it relates to
      props.addComment(props.blog, content.value)
      resetForm()
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <>
      <form onSubmit={handleComment}>
        <input {...content.excludeReset} />
        <button type="submit">Add Comment</button>
      </form>
    </>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
}

export default connect(
  null,
  { addComment },
)(CommentForm)
