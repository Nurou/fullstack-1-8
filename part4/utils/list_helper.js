let _ = require('lodash')

const dummy = blogs => 1

// total likes of all blogs
function totalLikes(blogs) {
  if (!blogs.length) return 0

  const reducer = (totalLikes, currentBlog) => {
    return totalLikes + currentBlog.likes
  }

  return blogs.reduce(reducer, 0)
}

// favourite blog based on likes
function favouriteBlog(blogs) {
  if (!blogs.length) return null
  if (blogs.length === 1) return blogs[0]

  let mostLiked = blogs[0]

  blogs.forEach(blog => {
    if (blog.likes > mostLiked.likes) mostLiked = blog
  })

  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes,
  }
}

// author who's written the most blogs
function mostBlogs(blogs) {
  // no blogs? no author
  if (!blogs.length) return ''
  // one blog? its author
  if (blogs.length === 1) return blogs[0].author

  // many blogs?
  const authorArray = _.map(blogs, 'author')
  const authorWithMostPosts = _.chain(authorArray) // wraps the object -> enable chaining
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

// author with most total likes
function mostLikes(blogs) {
  // no blogs? no author
  if (!blogs.length) return ''
  // one blog? its author
  if (blogs.length === 1) return blogs[0].author

  // only interested in author name and likes
  const authorsAndLikes = blogs.map(blog => {
    return {
      author: blog.author,
      likes: blog.likes,
    }
  })

  const consolidatedLikes = authorsAndLikes.reduce((prev, current) => {
    // is author already in new array? Compare names
    const alreadyAdded = prev.find(
      existing => existing.author === current.author,
    )

    if (alreadyAdded) {
      const updatedAuthor = {
        ...alreadyAdded,
        likes: alreadyAdded.likes + current.likes,
      }
      return prev.map(existing =>
        existing.author === current.author ? updatedAuthor : existing,
      )
    }
    // no? add to consolidated
    return prev.concat(current)
  }, [])

  const mostLiked = _.maxBy(consolidatedLikes, 'likes')

  return mostLiked
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}
