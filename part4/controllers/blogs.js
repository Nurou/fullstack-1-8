// ROUTERS
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// TODO: async/await error handling

// get blogs
blogsRouter.get('/', async (request, response) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
  } catch (exception) {}
})

// enable posting new blogs
blogsRouter.post('/', async (request, response) => {
  const content = request.body
  if (!content.url && !content.title) {
    response.status(400).end()
  }

  // default to 0 if likes prop is missing
  !content.likes ? (content.likes = 0) : content.likes

  try {
    const blog = new Blog(content)
    const result = await blog.save()
    response.status(201).json(result)
  } catch (exception) {}
})

// deleting blog posts
blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {}
})

// update a blogs likes
blogsRouter.put('/:id', async (request, response) => {
  const { body } = request

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  // Issues a mongodb findAndModify update command by a document's _id field
  const updatedPost = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.json(updatedPost.toJSON())
})

module.exports = blogsRouter
