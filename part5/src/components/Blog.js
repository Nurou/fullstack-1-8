import React, { useState, useImperativeHandle, Link } from 'react'
const Blog = React.forwardRef(({ blog }, ref) => {
  const [visible, setVisible] = useState(false)

  const displayWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    console.log(blog)
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => toggleVisibility)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'medium solid green',
    borderWidth: 1,
    marginBottom: 5,
    width: 'auto',
  }

  return (
    <>
      <div onClick={toggleVisibility} style={blogStyle}>
        {blog.title} {blog.author}
      </div>

      <div style={displayWhenVisible}>
        <>
          <div style={blogStyle}>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.url}
            </a>
            <br />
            {blog.likes} likes <button>like</button> <br />
            added by {blog.user.name}
            <br />
          </div>
        </>
      </div>
    </>
  )
})

export default Blog
