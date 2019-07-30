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

afterAll(() => {
  mongoose.connection.close()
})
