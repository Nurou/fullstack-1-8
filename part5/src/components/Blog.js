import React, { useState, useImperativeHandle } from 'react'

const Blog = React.forwardRef(({ blog, addLike, removePost, user }, ref) => {
  const [visible, setVisible] = useState(false)

  const displayWhenVisible = { display: visible ? '' : 'none' }
  const displayButton = { display: user.name === blog.user.name ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => toggleVisibility)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'medium solid green',
    borderWidth: 1,
    marginBottom: 5,
    width: '50%',
  }
  const infoStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'medium dashed green',
    borderWidth: 1,
    marginBottom: 5,
    width: '50%',
  }

  return (
    <>
      <div onClick={toggleVisibility} style={blogStyle} className="defaultInfo">
        <strong>
          {blog.title} {blog.author}
        </strong>
      </div>

      <div style={displayWhenVisible} className="allInfo">
        <div style={infoStyle}>
          URL:{' '}
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
          <br />
          Popularity: {blog.likes} likes <button onClick={addLike}>Like</button>{' '}
          <br />
          Post added by: {blog.user.name}
          <br />
          <button onClick={removePost} style={displayButton}>
            Remove
          </button>
        </div>
      </div>
    </>
  )
})

export default Blog
