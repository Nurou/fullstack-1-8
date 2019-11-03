import blogsService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case `INIT_BLOGS`:
      return action.data.sort((a, b) => b.likes - a.likes)
    case `LIKE`:
      const likedBlog = action.data.returnedBlog
      const id = likedBlog.id
      return state
        .map(blog => (blog.id === id ? likedBlog : blog))
        .sort((a, b) => b.likes - a.likes)
    case 'REMOVE':
      return state
        .filter(blog => blog.id !== action.data.id)
        .sort((a, b) => b.likes - a.likes)
    case 'NEW_BLOG':
      const newBlog = action.data.returnedBlog
      return state.concat(newBlog).sort((a, b) => b.likes - a.likes)
    case `NEW_COMMENT`:
      const commentBlogId = action.data.blog
      const updatedBlog = state.find(blog => blog.id === commentBlogId)
      console.log({ updatedBlog })
      return state
        .map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog))
        .sort((a, b) => b.likes - a.likes)
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

export const addComment = (blog, comment) => {
  return async dispatch => {
    const returnedComment = await blogsService.updateComments(blog.id, comment)
    console.log({ returnedComment })
    dispatch({
      type: 'NEW_COMMENT',
      data: returnedComment,
    })
  }
}

/* async dispatch used below as back end is updated*/
export const addLike = likedBlog => {
  const id = likedBlog.id
  const updatedBlog = {
    ...likedBlog,
    likes: likedBlog.likes + 1,
    // comments: likedBlog.comments.map(comment => comment.id),
  }

  return async dispatch => {
    // update like in back-end and return updated blog
    const returnedBlog = await blogsService.update(id, updatedBlog)
    // dispatch the blog with the added like
    dispatch({
      type: 'LIKE',
      data: { returnedBlog },
    })
  }
}

export default blogsReducer
