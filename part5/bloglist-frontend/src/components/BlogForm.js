import { useField } from '../hooks/index'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addNotification } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogsReducer'
import Notification from '../components/Notification'

const BlogForm = ({ addNotification, addBlog }) => {
  // custom hook for fields
  const title = useField('text', 'title')
  const author = useField('text', 'author')
  const url = useField('url', 'url')

  const handleSubmit = async event => {
    const resetForm = () => {
      title.reset()
      author.reset()
      url.reset()
    }

    try {
      event.preventDefault()
      const blogObject = {
        title: title.value,
        author: author.value,
        url: url.value,
      }
      // add to backend & redux store
      addBlog(blogObject)
      addNotification(
        `A new blog ${title.value} by ${author.value} was added!`,
        2,
      )
      resetForm()
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <>
      <Notification />
      <form onSubmit={handleSubmit}>
        <div>
          <input id="title" {...title.excludeReset} />
        </div>
        <div>
          <input id="author" {...author.excludeReset} />
        </div>
        <div>
          <input id="url" {...url.excludeReset} />
        </div>
        <button type="submit" data-cy="create">
          Create
        </button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  addNotification: PropTypes.func.isRequired,
  addBlog: PropTypes.func.isRequired,
}

// redux
const mapStateToProps = state => {
  // retrieving the state of the notification
  // from store and returning a prop that holds it
  console.log(state)
  return {
    notification: state.notification,
  }
}

const mapDispatchToProps = {
  addNotification,
  addBlog,
}

// export default BlogForm
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlogForm)
