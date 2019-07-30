const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const testApi = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

// reset db before each test run
beforeEach(async () => {
  // clear
  await Blog.deleteMany({})
  // save initial blogs
  // for...of block guarantees a specific execution order.
  for (let blog of helper.initialBlogList) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  console.log('entered test')
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

afterAll(() => {
  mongoose.connection.close()
})
