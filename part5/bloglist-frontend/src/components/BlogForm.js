import { useField } from '../hooks/index'
import blogsService from '../services/blogs'
import React from 'react'
import PropTypes from 'prop-types'
import { addNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const BlogForm = ({ blogs, updateBlogs, updateMessage, notification }) => {
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
      const returnedBlog = await blogsService.create(blogObject)
      updateBlogs(blogs.concat(returnedBlog))
      // updateMessage(`A new blog ${title.value} by ${author.value} was added!`)
      // setTimeout(() => {
      //   updateMessage(null)
      // }, 2000)
      notification.addNotification(
        `A new blog ${title.value} by ${author.value} was added!`,
      )
      setTimeout(() => {
        notification.addNotification(null)
      }, 2000)
      resetForm()
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input {...title.excludeReset} />
      </div>
      <div>
        <input {...author.excludeReset} />
      </div>
      <div>
        <input {...url.excludeReset} />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  updateBlogs: PropTypes.func.isRequired,
  updateMessage: PropTypes.func.isRequired,
}

// redux
const mapStateToProps = state => {
  // retrieving the state of the notification
  // from store and returning a prop that holds it
  return {
    notification: state.notification,
  }
}

// export default BlogForm
export default connect(mapStateToProps)(BlogForm)
