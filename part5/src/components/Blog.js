import React, { useState, useImperativeHandle } from 'react'

const Blog = React.forwardRef(({ blog, addLike }, ref) => {
  const [visible, setVisible] = useState(false)

  const displayWhenVisible = { display: visible ? '' : 'none' }

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
    width: 'auto',
  }

  // capitalise user name
  const postedBy = blog.user.name
    .toLowerCase()
    .split(' ')
    .map(name => name.charAt(0).toUpperCase() + name.substring(1))
    .join(' ')

  return (
    <>
      <div onClick={toggleVisibility} style={blogStyle}>
        {blog.title} {blog.author}
      </div>

      <div style={displayWhenVisible}>
        <>
          <div style={blogStyle}>
            URL:{' '}
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.url}
            </a>
            <br />
            Popularity: {blog.likes} likes{' '}
            <button onClick={addLike}>Like</button> <br />
            Post added by: {postedBy}
            <br />
          </div>
        </>
      </div>
    </>
  )
})

export default Blog
