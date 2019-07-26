const dummy = blogs => {
  return 1
}

function totalLikes(blogs) {
  if (!blogs.length) return 0

  const reducer = (totalLikes, currentBlog) => {
    return totalLikes + currentBlog.likes
  }

  return blogs.reduce(reducer, 0)
}

function favouriteBlog(blogs) {
  if (blogs.length === 0) return {}
  if (blogs.length === 1) return blogs[0]

  let mostLiked = blogs[0]

  blogs.forEach(blog => {
    blog.likes > mostLiked.likes ? (mostLiked = blog) : null
  })

  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
}
