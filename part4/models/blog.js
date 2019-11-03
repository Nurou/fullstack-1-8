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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
})

// format returned object
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // prettier id
    returnedObject.id = returnedObject._id.toString()
    // get rid of ugly id & version
    delete returnedObject._id
    delete returnedObject.__v
  },
})

// create model
const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
