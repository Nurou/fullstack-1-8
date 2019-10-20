import React from 'react'
import Blog from '../components/Blog'

const BlogList = props => {
  // map each one to a component

  return sortedBlogs.map(blog => (
    <Blog
      key={blog.id}
      blog={blog}
      ref={blogRef}
      addLike={() => handleLikeUpdate(blog.id)}
      removePost={() => handlePostRemoval(blog.id)}
      user={user}
    />
  ))
}

export default BlogList
