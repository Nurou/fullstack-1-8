import React from 'react'

const User = ({ user }) => {
  const blogCount = user.blogs.length

  const capitalizeFirsts = text => {
    return text
      .toLowerCase()
      .split(' ')
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(' ')
  }

  const formattedName = capitalizeFirsts(user.name)

  return (
    <div>
      <h1> {formattedName}</h1>
      {blogCount ? (
        <>
          <h2>Blogs added</h2>
          <ul>
            {user.blogs.map(blog => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </>
      ) : (
        <h3>{formattedName} has not added any blogs</h3>
      )}
    </div>
  )
}

export default User
