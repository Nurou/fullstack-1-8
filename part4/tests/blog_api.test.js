const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const testApi = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

// clear db prior to test run
beforeEach(async () => {
  // delete all blogs
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
  await testApi
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})
