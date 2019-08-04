const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const testApi = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

// reset db before each test run
beforeEach(async () => {
  // clear
  await Blog.deleteMany({})
  await User.deleteMany({})
  // save initial blogs
  const blogObjects = helper.initialBlogList.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  const userObjects = helper.initialUserList.map(user => new User(user))
  const promiseArray2 = userObjects.map(user => user.save())
  await Promise.all(promiseArray, promiseArray2)
})

test('blogs are returned as json', async () => {
  await testApi
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await testApi.get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogList.length)
})

test('unique identifier is named id', async () => {
  const result = await testApi.get('/api/blogs/')
  result.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('a valid blog post can be added', async () => {
  // test blog post
  const newPost = {
    title: 'testing adding a post',
    author: 'Joel Hassan',
    url: 'https://joelhassan.com/',
    likes: 10000,
  }

  // post the blog
  await testApi
    .post('/api/blogs')
    .send(newPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const finalBlogList = await helper.blogsInDb()
  expect(finalBlogList.length).toBe(helper.initialBlogList.length + 1)
})

test('default to 0 if likes property missing', async () => {
  const newPost = {
    title: 'testing adding a post',
    author: 'Joel Hassan',
    url: 'https://joelhassan.com/',
  }

  const savedBlog = await testApi
    .post('/api/blogs')
    .send(newPost)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(savedBlog.body.likes).toBeDefined()
})

test('respond with 400 bad if title and url missing', async () => {
  const newPost = {
    // title: 'testing adding a post',
    author: 'Joel Hassan',
    // url: 'https://joelhassan.com/',
    likes: 1000,
  }

  await testApi
    .post('/api/blogs')
    .send(newPost)
    .expect(400)
})

test('deletion successful', async () => {
  const postsAtStart = await helper.blogsInDb()
  const blogToDelete = postsAtStart[0]

  await testApi.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const finalBlogList = await helper.blogsInDb()

  expect(finalBlogList.length).toBe(helper.initialBlogList.length - 1)
})

test('likes are updated successfully', async () => {
  // initial blog list
  const postsAtStart = await helper.blogsInDb()
  const postToUpdate = postsAtStart[0]

  const updatedPost = {
    ...postToUpdate,
    likes: postToUpdate.likes + 1,
  }
  const returnedPost = await testApi
    .put(`/api/blogs/${updatedPost.id}`)
    .send(updatedPost)
    .expect(200)

  const returnedPostsLikes = returnedPost.body.likes

  expect(returnedPostsLikes).toBe(postToUpdate.likes + 1)
})

test('invalid users cannot be created', async () => {
  // invalid user
  const newUser = {
    username: 'test',
    name: 'invalid user',
    password: '12',
  }

  // post the blog
  const result = await testApi
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('the password is too short')
})

afterAll(() => {
  mongoose.connection.close()
})
