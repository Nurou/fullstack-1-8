let _ = require('lodash')

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
  if (!blogs.length) return {}
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

function mostBlogs(blogs) {
  // no blogs? no author
  if (!blogs.length) return ''
  // one blog? its author
  if (blogs.length === 1) return blogs[0].author

  // LODASH TO THE RESCUE!
  const authorArray = _.map(blogs, 'author')
  // chain: returns a wrapped object. Calling methods on this object will continue
  // to return wrapped objects until value is used
  const authorWithMostPosts = _.chain(authorArray)
    .countBy() //  sorts a list into groups and returns a postCount for the number of objects in each group
    .toPairs() // converts an object into a list of [key, value] pairs
    .max(_.last) // returns max of last element
    .head() // returns first array element
    .value() // unwrap to get primitive

  const postCount = blogs.filter(blog => blog.author === authorWithMostPosts)
    .length

  return {
    author: authorWithMostPosts,
    blogs: postCount,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
}
