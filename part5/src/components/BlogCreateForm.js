import React, { useState } from 'react'
import blogsService from '../services/blogs'

const BlogCreateForm = ({ blogs, setBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async event => {
    event.preventDefault()
    try {
      const blogObject = {
        title: title,
        author: author,
        url: url,
      }
      const returnedBlog = await blogsService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))

      // clear fields
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.log(exception)
    }
  }
  return (
    <form onSubmit={addBlog}>
      <h2>Create new</h2>
      <div>
        title:{' '}
        <input
          type="text"
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:{' '}
        <input
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:{' '}
        <input
          type="text"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogCreateForm
