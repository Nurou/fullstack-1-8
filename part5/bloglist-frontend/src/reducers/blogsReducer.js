import blogsService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case `INIT_BLOGS`:
      return action.data.sort((a, b) => b.likes - a.likes)
    case `LIKE`:
      // setBlogs(blogs.map(blog => (blog.id === id ? returnedBlog : blog)))
      const updatedBlog = action.data.updatedBlog
      const id = action.data.id
      return state
        .map(blog => (blog.id === id ? updatedBlog : blog))
        .sort((a, b) => b.likes - a.likes)
    case 'REMOVE':
      return state
        .filter(blog => blog.id !== action.data.id)
        .sort((a, b) => b.likes - a.likes)
    case 'NEW_BLOG':
      const newBlog = action.data.returnedBlog
      return state.concat(newBlog).sort((a, b) => b.likes - a.likes)
    default:
      return state.sort((a, b) => b.likes - a.likes)
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

/* async dispatch used below as back end is updated*/
export const addLike = (id, updatedBlog) => {
  return async dispatch => {
    // update like in back-end and return updated blog
    await blogsService.update(id, updatedBlog)
    // dispatch the blog with the added like
    dispatch({
      type: 'LIKE',
      data: { id, updatedBlog },
    })
  }
}

export const removeBlog = id => {
  return async dispatch => {
    // remove from back end
    await blogsService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: { id },
    })
  }
}

export const addBlog = blogObject => {
  return async dispatch => {
    // add to back end
    const returnedBlog = await blogsService.create(blogObject)
    dispatch({
      type: 'NEW_BLOG',
      data: { returnedBlog },
    })
  }
}

export default blogsReducer
