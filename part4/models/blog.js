// BLOG MODEL
const mongoose = require('mongoose')

// deal with deprecation warning
mongoose.set('useFindAndModify', false)

// schema constructor
const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

// format returned object
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

// create model
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
