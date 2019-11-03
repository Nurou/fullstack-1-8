// ROUTERS
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')

/* defining request handlers for the router */
// get blogs
blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
      .populate('user', { username: 1, name: 1 })
      .populate('comments', { content: 1, blog: 1 })

    await response.json(blogs.map(blog => blog.toJSON()))
  } catch (exception) {
    next(exception)
  }
})

// posting new blogs for users with valid token
blogsRouter.post('/', async (request, response, next) => {
  const { body } = request

  try {
    // jwt.verify() decodes token & returns the object the token was based on
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    // is there a token? is the user identity included?
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    // if both url and title missing -> 400
    if (!body.url && !body.title) {
      return response.status(400).end()
    }
    // get user by token
    const user = await User.findById(decodedToken.id)

    // create the new blog post
    const blog = body

    // designate the user as post creator
    blog.user = user._id
    blog.author = blog.author === null ? 'unknown' : blog.author
    blog.likes = blog.likes ? blog.likes : (body.likes = 0)
    blog.comments = []

    const blogObject = new Blog(blog)

    // save post
    const savedBlogPost = await blogObject.save()
    // populate user - save() is not a query --> must do stuff differently:
    savedBlogPost.populate('user').execPopulate()
    savedBlogPost.populate('comments').execPopulate()
    // add the post to user's posts
    user.blogs = user.blogs.concat(savedBlogPost._id)
    // finally, save the updated user
    await user.save()
    // respond with saved post
    response.status(201).json(savedBlogPost)
  } catch (exception) {
    next(exception)
  }
})

// deleting blog posts
blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    // only possible with valid token
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    // check token validity
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({
        error: 'token missing or invalid',
      })
    }

    const blogToDelete = await Blog.findById(request.params.id)

    if (!blogToDelete) {
      return response.status(404).end()
    }

    // was the blog created by the user attempting delete?
    const blogCreatorsId = blogToDelete.user.toString()
    const authenticatedUsersId = decodedToken.id.toString()

    if (blogCreatorsId !== authenticatedUsersId) {
      return response.status(401).json({
        error: 'the user does not have permission to delete post ',
      })
    }

    // everything cool? remove the blog
    const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
    // response.status(204).end()
    response.status(202).json(deletedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

// update a blogs likes
blogsRouter.put('/:id', async (request, response, next) => {
  try {
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
      .populate('user', { username: 1, name: 1 })
      .populate('comments', { content: 1, blog: 1 })

    response.json(updatedPost.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  try {
    // get comment content
    const { body } = request
    const comment = body

    const blog = await Blog.findById(body.id)
      .populate('user', { username: 1, name: 1 })
      .populate('comments', { content: 1, blog: 1 })
    // add the id to the comment
    comment.blog = blog._id
    const commentObject = new Comment(comment)
    const savedComment = await commentObject.save()

    // save comment
    savedComment.populate('blogs').execPopulate()

    blog.comments = blog.comments
      ? blog.comments.concat(savedComment._id)
      : [savedComment._id]

    await blog.save()
    response.status(201).json(savedComment)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter
