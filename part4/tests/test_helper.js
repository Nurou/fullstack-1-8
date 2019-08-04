const Blog = require('../models/blog')

const initialBlogList = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
]
const initialUserList = [
  {
    username: 'nurou',
    name: 'Joel Hassan',
    password: 'wickedest',
  },
  {
    username: 'Iimaan',
    name: 'Bambu',
    password: 'copy',
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogList,
  initialUserList,
  blogsInDb,
  usersInDb,
}
